<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Biodata;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BiodataController extends Controller
{
    /**
     * Tampilkan halaman biodata untuk role user.
     */
    public function index()
    {
        $user = auth()->user();
        if ($user->role->name !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $biodata = Biodata::where('user_id', $user->id)->first();
        return Inertia::render('User/Biodata', [
            'biodata' => $biodata,
        ]);
    }

    /**
     * Tampilkan halaman biodata untuk role cosrent.
     */
    public function indexCosrent()
    {
        $user = auth()->user();
        if ($user->role->name !== 'cosrent') {
            abort(403, 'Unauthorized access');
        }

        $biodata = Biodata::where('user_id', $user->id)->first();
        return Inertia::render('Cosrent/Biodata', [
            'biodata' => $biodata,
        ]);
    }

    /**
     * Simpan data biodata baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone_whatsapp' => 'required|numeric',
            'parents_phone' => 'required|numeric',
            'full_address' => 'required|string',
            'instagram' => 'required|string',
            'tiktok' => 'nullable|string',
            'friends_social_media' => 'required|string',
            'ktp' => 'required|image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048',
            'selfie_with_ktp' => 'required|image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048',
        ]);

        $user = auth()->user();

        // Proses upload file
        $ktp_path = $this->uploadFile($request->file('ktp'), 'uploads/biodata/ktp', $user->name);
        $selfie_with_ktp_path = $this->uploadFile($request->file('selfie_with_ktp'), 'uploads/biodata/selfie', $user->name);

        // Simpan ke database
        $biodata = Biodata::create(array_merge($validated, [
            'user_id' => $user->id,
            'ktp' => $ktp_path,
            'selfie_with_ktp' => $selfie_with_ktp_path,
        ]));

        return $biodata
            ? redirect()->back()->with('success', 'Data berhasil disimpan')
            : redirect()->back()->with('error', 'Data gagal disimpan');
    }

    /**
     * Perbarui data biodata yang ada.
     */
    public function update(Request $request, $id)
    {
        $biodata = Biodata::findOrFail($id);

        $this->authorizeAccess($biodata);

        $rules = [
            'phone_whatsapp' => 'required|numeric',
            'parents_phone' => 'required|numeric',
            'full_address' => 'required|string',
            'instagram' => 'required|string',
            'tiktok' => 'nullable|string',
            'friends_social_media' => 'required|string',
        ];

        if ($request->hasFile('ktp')) {
            $rules['ktp'] = 'nullable|image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048';
        } else {
            $rules['ktp'] = 'nullable|string';
        }

        if ($request->hasFile('selfie_with_ktp')) {
            $rules['selfie_with_ktp'] = 'nullable|image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048';
        } else {
            $rules['selfie_with_ktp'] = 'nullable|string';
        }

        $validated = $request->validate($rules);

        // Proses update file
        if ($request->hasFile('ktp')) {
            $this->deleteFile($biodata->ktp);
            $validated['ktp'] = $this->uploadFile($request->file('ktp'), 'uploads/biodata/ktp', auth()->user()->name);
        }

        if ($request->hasFile('selfie_with_ktp')) {
            $this->deleteFile($biodata->selfie_with_ktp);
            $validated['selfie_with_ktp'] = $this->uploadFile($request->file('selfie_with_ktp'), 'uploads/biodata/selfie', auth()->user()->name);
        }

        // Update ke database
        return $biodata->update($validated)
            ? redirect()->back()->with('success', 'Data berhasil diperbarui')
            : redirect()->back()->with('error', 'Data gagal diperbarui');
    }

    /**
     * Fungsi bantu untuk upload file.
     */
    private function uploadFile($file, $path, $prefix)
    {
        $filename = $prefix . '-' . now()->format('YmdHis') . '-' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        return $file->storeAs($path, $filename, 'public');
    }

    /**
     * Fungsi bantu untuk menghapus file.
     */
    private function deleteFile($path)
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * Fungsi untuk memvalidasi akses pengguna ke biodata.
     */
    private function authorizeAccess($biodata)
    {
        if (auth()->id() !== $biodata->user_id) {
            abort(403, 'Unauthorized access');
        }
    }
}
