<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Cosrent;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CosrentController extends Controller
{
    public function __construct()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            redirect('/');

            // abort(403, 'Unauthorized access');
        }
    }

    public function search(Request $request)
    {
        $cosrents = Cosrent::search(
            keyword: $request->search,
            columns: ['cosrent_name', 'telp_number', 'address'],
        )->get();

        return response()->json($cosrents, 200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cosrent = Cosrent::all();
        return Inertia::render("Admin/Cosrent/App", ['datas' => $cosrent]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Cosrent/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'cosrent_name' => 'required|string',
                'telp_number' => 'required|numeric',
                'address' => 'required|string',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            ], [
                'name.required' => 'Nama cosrent harus diisi',
                'name.string' => 'Nama cosrent harus berupa string',
                'telp_number.required' => 'Nomor telp harus diisi',
                'telp_number.numeric' => 'Nomor telp harus berupa angka',
                'address.required' => 'Alamat harus diisi',
                'address.string' => 'Alamat harus berupa string'
            ]);

            DB::beginTransaction();

            $password = 'password';
            $userRole = Role::where('name', 'cosrent')->first();

            $user = User::create([
                'name' => $request->cosrent_name,
                'email' => $request->email,
                'password' => Hash::make($password),
                'role_id' => $userRole->id,
            ]);

            if ($user) {
                $cosrent = Cosrent::create([
                    'cosrent_name' => $request->cosrent_name,
                    'telp_number' => $request->telp_number,
                    'address' => $request->address,
                    'user_id' => $user->id
                ]);
            }
            DB::commit();

            if ($cosrent) {
                return redirect()
                    ->route('admin.cosrent')
                    ->with('success', 'Data cosrent berhasil ditambahkan!');
            }
        } catch (ValidationException $e) {
            DB::rollBack();
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Validasi saat menambah data : ' . $e->getMessage());
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Server saat menambah data : ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $cosrent = Cosrent::find($id);
        $user = User::find($cosrent->user_id);
        return Inertia::render('Admin/Cosrent/Edit', ['cosrent' => $cosrent, 'user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cosrent = Cosrent::find($id);
        if ($cosrent == null) {
            return redirect()
                ->route('admin.cosrent')
                ->with('error', 'Data cosrent tidak ditemukan!');
        }
        $user = User::find($cosrent->user_id);
        if ($user == null) {
            return redirect()
                ->route('admin.cosrent')
                ->with('error', 'Data user tidak ditemukan!');
        }
        try {
            $request->validate([
                'cosrent_name' => 'required|string',
                'telp_number' => 'required|numeric',
                'address' => 'required|string',
                'email' => [
                    'required',
                    'string',
                    'lowercase',
                    'email',
                    'max:255',
                    Rule::unique(User::class)->ignore($user->id),
                ],
            ], [
                'name.required' => 'Nama cosrent harus diisi',
                'name.string' => 'Nama cosrent harus berupa string',
                'telp_number.required' => 'Nomor telp harus diisi',
                'telp_number.numeric' => 'Nomor telp harus berupa angka',
                'address.required' => 'Alamat harus diisi',
                'address.string' => 'Alamat harus berupa string'
            ]);

            DB::beginTransaction();


            $password = 'password';
            $userRole = Role::where('name', 'cosrent')->first();

            $update_user = $user->update([
                'name' => $request->cosrent_name,
                'email' => $request->email,
                'password' => Hash::make($password),
                'role_id' => $userRole->id,
            ]);

            if ($update_user) {
                $update_cosrent = $cosrent->update([
                    'cosrent_name' => $request->cosrent_name,
                    'telp_number' => $request->telp_number,
                    'address' => $request->address,
                    'user_id' => $user->id
                ]);
            }
            DB::commit();

            if ($update_cosrent) {
                return redirect()
                    ->route('admin.cosrent')
                    ->with('success', 'Data cosrent berhasil diperbarui!');
            }
        } catch (ValidationException $e) {
            DB::rollBack();
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Validasi saat mengubah data cosrent: ' . $e->getMessage());
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Server saat mengubah data cosrent: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $cosrent = Cosrent::find($id);
            $cosrent->delete();

            return redirect()
                ->route('admin.cosrent')
                ->with('success', 'Data cosrent berhasil dihapus!');
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Server saat menghapus data cosrent: ' . $e->getMessage());
        }
    }
}
