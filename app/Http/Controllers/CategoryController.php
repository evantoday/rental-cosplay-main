<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    public function __construct()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'admin') {
            abort(403, 'Unauthorized access');
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Category/App', ['datas' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
            ], [
                'name.required' => 'Nama kategori harus diisi',
                'name.string' => 'Nama kategori harus berupa string'
            ]);

            Category::create([
                'name' => $request->name
            ]);

            return redirect()
                ->route('admin.category')
                ->with('success', 'Data Kategori berhasil ditambahkan!');
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Validasi saat menambah kategori: ' . $e->getMessage());
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Server saat menambah kategori: ' . $e->getMessage());
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
        $categories = Category::find($id);
        return Inertia::render('Admin/Category/Edit', ['datas' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required|string',
            ], [
                'name.required' => 'Nama kategori harus diisi',
                'name.string' => 'Nama kategori harus berupa string'
            ]);

            $category = Category::find($id);
            $category->name = $request->name;
            $category->save();

            return redirect()
                ->route('admin.category')
                ->with('success', 'Data Kategori berhasil diubah!');
        } catch (ValidationException $e) {
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Validasi saat mengubah kategori: ' . $e->getMessage());
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Server saat mengubah kategori: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $category = Category::find($id);
            $category->delete();

            return redirect()
                ->route('admin.category')
                ->with('success', 'Data Kategori berhasil dihapus!');
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan Server saat menghapus kategori: ' . $e->getMessage());
        }
    }
}
