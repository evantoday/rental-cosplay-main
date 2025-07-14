<?php

namespace App\Http\Controllers;

use App\Models\Costum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LandingPageController extends Controller
{

    public function detailCostumeUser($id)
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $costume = Costum::where('id', "=", $id)
            ->with(['category', 'images_of_costum' => function ($query) {
                $query->select('id', 'costum_id', 'images_link');
                $query->orderBy('id', 'asc');
            }])
            ->with('cosrent')
            ->first();

        $costume->images_of_costum->transform(function ($image) {
            $image->images_link = Storage::url('public/' . $image->images_link) ?? null;
            return $image;
        });


        if (!$costume) {
            abort(404, 'Costume not found');
        }

        return Inertia::render('User/DetailsCostume/App', [
            'costume' => $costume
        ]);
    }

    public function search(Request $request)
    {
        $costume = Costum::with(['category', 'images_of_costum' => function ($query) {
            $query->select('id', 'costum_id', 'images_link');
            $query->orderBy('id', 'asc');
        }])->with('cosrent')
            ->search(
                keyword: $request->search,
                columns: ['costum.name', 'costum.price', 'costum.size', 'costum.brand', 'costum.status'],
            )
            ->get()
            ->map(function ($image) {
                $image->images_of_costum->map(function ($item) {
                    $item->images_link =  Storage::url('public/' . $item->images_link);
                    return $item;
                });
                return $image;
            });

        return response()->json($costume, 200);
    }
}
