<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Costum;
use App\Models\Cosrent;
use App\Models\Category;
use App\Enums\CostumeSize;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ImageOfCostum;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CostumController extends Controller
{
    public function checkcosrent()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'cosrent') {
            // return redirect('/');
            abort(403, 'Unauthorized access');
        }
    }
    public function __construct()
    {
        $this->checkcosrent();
    }

    public function getCosrentAccount()
    {
        $auth_user_id = auth()->user()->id;
        $user = Cosrent::where('user_id', $auth_user_id)->first();
        return $user;
    }

    public function search(Request $request)
    {
        $costumes = Costum::where('cosrent_id', $this->getCosrentAccount()->id)
            ->join('category', 'costum.category_id', '=', 'category.id')
            ->select('costum.*', 'category.name as category_name')
            ->with('firstImage')
            ->orderBy('id', 'desc')
            ->search(
                keyword: $request->search,
                columns: ['costum.name', 'price', 'category.name', 'size', 'brand', 'status'],
            )->get()
            ->map(function ($item) {
                if ($item->firstImage) {
                    $item->firstImage->images_link = Storage::url('public/' . $item->firstImage->images_link);
                }
                return $item;
            });

        return response()->json($costumes, 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $costumes = Costum::where('cosrent_id', $this->getCosrentAccount()->id)
            ->join('category', 'costum.category_id', '=', 'category.id')
            ->select('costum.*', 'category.name as category_name')
            ->with('firstImage')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($item) {
                if ($item->firstImage) {
                    $item->firstImage->images_link = Storage::url('public/' . $item->firstImage->images_link);
                }
                return $item;
            });

        return Inertia::render("Cosrent/Costume/App", [
            'datas' => $costumes
        ]);
    }

    public function sizes()
    {
        $size =  [
            CostumeSize::XS->value,
            CostumeSize::S->value,
            CostumeSize::M->value,
            CostumeSize::L->value,
            CostumeSize::XL->value,
            CostumeSize::XXL->value,
            CostumeSize::OTHER->value
        ];
        return $size;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $cosrent = $this->getCosrentAccount();
        return Inertia::render("Cosrent/Costume/Create", [
            'categories' => $categories,
            'sizes' => $this->sizes(),
            'cosrent' => $cosrent
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "description" => "required|string",
            "price" => "required|numeric",
            "category_id" => "required|numeric|in:" . implode(",", Category::all()->pluck('id')->toArray()),
            "cosrent_id" => "required|numeric|in:" . implode(",", Cosrent::all()->pluck('id')->toArray()),
            "size" => "required|in:" . implode(",", $this->sizes()),
            "brand" => "required|string",
            'images' => 'required|array',
            "images.*" => "image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048",
        ], [
            'name.required' => 'Nama harus diisi',
            'name.string' => 'Nama harus berupa string',
            'description.required' => 'Deskripsi harus diisi',
            'description.string' => 'Deskripsi harus berupa string',
            'price.required' => 'Harga harus diisi',
            'price.numeric' => 'Harga harus berupa angka',
            'category_id.required' => 'Kategori harus dipilih',
            'category_id.numeric' => 'Kategori harus berupa angka',
            'cosrent_id.required' => 'Cosrent harus dipilih',
            'cosrent_id.numeric' => 'Cosrent harus berupa angka',
            'size.required' => 'Ukuran harus diisi',
            'size.in' => 'Ukuran harus sesuai dengan opsi',
            'brand.required' => 'Merek harus diisi',
            'brand.string' => 'Merek harus berupa string',
            'images.required' => 'Gambar harus diisi',
            'images.array' => 'Gambar harus berupa array',
            'images.*.image' => 'File harus berupa gambar',
            'images.*.mimes' => 'Format gambar harus jpg,jpeg,png,bmp,svg,gif',
            'images.*.max' => 'Ukuran gambar maksimal 2MB',
        ]);

        try {
            DB::beginTransaction();

            $insert_costum = Costum::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'category_id' => $request->category_id,
                'cosrent_id' => $request->cosrent_id,
                'size' => $request->size,
                'brand' => $request->brand,
            ]);

            if ($request->hasFile('images')) {
                $files = $request->file('images');
                foreach ($files as $image) {
                    $extension = $image->getClientOriginalExtension();
                    $costum = Costum::latest()->first();
                    $file_name = $costum->name . '-' . date('YmdHis') . '-' . Str::random(10) . '.' . $extension;
                    $path = "uploads/costumes";

                    // $file_path = $image->storeAs($path, $file_name, 'public');
                    $file_path = Storage::disk('public')->putFile($path, $image, 'public');


                    ImageOfCostum::create([
                        'costum_id' => $costum->id,
                        'images_link' => $file_path,
                    ]);
                }
            }

            DB::commit();
            return redirect()->route('cosrent.costum')->with('success', 'Costum created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('cosrent.costum')->with('error', 'Failed to create costum: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $costume = Costum::where('id', '=', $id)
            ->with(['category', 'images_of_costum' => function ($query) {
                $query->select('id', 'costum_id', 'images_link');
                $query->orderBy('id', 'asc');
            }])
            ->first();

        // Tambahkan URL lengkap untuk setiap gambar
        $costume->images_of_costum->transform(function ($image) {
            $image->images_link = Storage::url('public/' . $image->images_link) ?? null;
            return $image;
        });

        return Inertia::render("Cosrent/Costume/Detail", [
            'datas' => $costume
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $costume = Costum::where('id', '=', $id)
            ->with(['category', 'images_of_costum' => function ($query) {
                $query->select('id', 'costum_id', 'images_link');
                $query->orderBy('id', 'asc');
            }])
            ->first();

        // Tambahkan URL lengkap untuk setiap gambar
        $costume->images_of_costum->transform(function ($image) {
            $image->images_link = Storage::url('public/' . $image->images_link) ?? null;
            return $image;
        });

        $categories = Category::all();
        $cosrent = $this->getCosrentAccount();
        $size = $this->sizes();

        return Inertia::render("Cosrent/Costume/Edit", [
            'datas' => $costume,
            'categories' => $categories,
            'sizes' => $size,
            'cosrent' => $cosrent
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $costume = Costum::findOrFail($id);

        $request->validate([
            "name" => "required|string",
            "description" => "required|string",
            "price" => "required|numeric",
            "category_id" => "required|numeric|in:" . implode(",", Category::all()->pluck('id')->toArray()),
            "size" => "required|in:" . implode(",", $this->sizes()),
            "brand" => "required|string",
            'new_images.*' => "nullable|image|mimes:jpg,jpeg,png,bmp,svg,gif|max:2048",
        ]);

        try {
            DB::beginTransaction();

            // Update costume details
            $costume->update([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'category_id' => $request->category_id,
                'size' => $request->size,
                'brand' => $request->brand,
            ]);

            // Handle new images if any
            if ($request->hasFile('new_images')) {
                $files = $request->file('new_images');
                foreach ($files as $image) {
                    $extension = $image->getClientOriginalExtension();
                    $path = "uploads/costumes";

                    $file_path = Storage::disk('public')->putFile($path, $image, 'public');

                    ImageOfCostum::create([
                        'costum_id' => $costume->id,
                        'images_link' => $file_path,
                    ]);
                }
            }

            DB::commit();
            return redirect()->route('cosrent.costum')->with('success', 'Costume updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('cosrent.costum')->with('error', 'Failed to update costume: ' . $e->getMessage());
        }
    }

    // Tambahkan method untuk menghapus gambar
    public function deleteImage($imageId)
    {
        try {
            $image = ImageOfCostum::findOrFail($imageId);
            Storage::delete('public/' . $image->images_link);
            $image->delete();

            return redirect()->back()->with('success', 'Image deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $costum_image = ImageOfCostum::where('costum_id', '=', $id)->get();
        $costum = Costum::find($id);

        if ($costum) {
            foreach ($costum_image as $image) {
                Storage::delete('public/' . $image->images_link);
                $image->delete();
            }
            $costum->delete();
            return redirect()->route('cosrent.costum')->with('success', 'Costume deleted successfully!');
        }

        return redirect()->route('cosrent.costum')->with('error', 'Costume not found!');
    }
}
