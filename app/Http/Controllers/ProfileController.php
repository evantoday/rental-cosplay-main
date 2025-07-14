<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Biodata;
use App\Models\Cosrent;
use App\Enums\RequestStatus;
use Illuminate\Http\Request;
use App\Models\RequestCosrent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    public function getCosrentAccount()
    {
        $auth_user_id = auth()->user()->id;
        $user = Cosrent::where('user_id', $auth_user_id)->first();
        return $user;
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole === 'admin|cosrent|user') {
            abort(403, 'Unauthorized access');
        }

        if ($userRole === 'cosrent') {
            $cosrent_account = $this->getCosrentAccount();
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'userRole' => $userRole,
                'cosrent_account' => $cosrent_account
            ]);
        }

        $request_cosrent = RequestCosrent::where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->first();
        if ($request_cosrent) {
            $request_status = in_array($request_cosrent->status, [RequestStatus::Approved->value, RequestStatus::Rejected->value]) ? false : true;
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'userRole' => $userRole,
                'status_request_cosrent' => $request_status
            ]);
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'userRole' => $userRole
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function cosrent(Request $request)
    {

        $request->validate([
            'cosrent_name' => 'required|string',
            'telp_number' => 'required|numeric',
            'address' => 'required|string',
        ], [
            'name.required' => 'Nama cosrent harus diisi',
            'name.string' => 'Nama cosrent harus berupa string',
            'telp_number.required' => 'Nomor telp harus diisi',
            'telp_number.numeric' => 'Nomor telp harus berupa angka',
            'address.required' => 'Alamat harus diisi',
            'address.string' => 'Alamat harus berupa string'
        ]);

        $cosrent = Cosrent::find($request->cosrent_id);
        if ($cosrent == null) {
            return redirect()
                ->route('cosrent.dashboard')
                ->with('error', 'Data cosrent tidak ditemukan!');
        }

        $update_cosrent = $cosrent->update([
            'cosrent_name' => $request->cosrent_name,
            'telp_number' => $request->telp_number,
            'address' => $request->address,
        ]);
        return;
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        $biodata = Biodata::where('user_id', $user->id)->first();
        if ($biodata) {
            $biodata->delete();
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
