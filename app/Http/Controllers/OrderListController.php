<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Cosrent;
use App\Enums\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OrderListController extends Controller
{
    public function checkcosrent()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'cosrent') {
            abort(403, 'Unauthorized access');
        }
    }
    public function __construct()
    {
        $this->checkcosrent();
    }

    public function search(Request $request)
    {
        $orders = Order::search(
            keyword: $request->search,
            columns: [
                //
            ],
        )->get();

        return response()->json($orders, 200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $cosrent = Cosrent::where('user_id', $user->id)->first();
        $order = Order::where('order.cosrent_id', $cosrent->id)
            ->join('costum', 'costum.id', '=', 'order.costum_id')
            ->join('cosrent', 'cosrent.id', '=', 'costum.cosrent_id')
            ->join('users', 'users.id', '=', 'order.user_id')
            ->where('order.status', '!=', OrderStatus::AWAITING_PAYMENT->value)
            ->select('costum.name as costume_name', 'cosrent.cosrent_name as cosrent_name', 'order.status', 'order.id', 'users.name as user_name')
            ->orderBy('order.created_at', 'desc')
            ->get();
        return Inertia::render("Cosrent/Orders/App", [
            "datas" => $order
        ]);
    }

    /**
     * Display the specified resource.
     */
   public function show(string $id)
{
    $order = Order::where('order.id', $id)
        ->with('costum', 'costum.cosrent', 'costum.images_of_costum', 'costum.category', 'user', 'user.biodata')
        ->first();

    // Pastikan URL file disiapkan
    $order->bukti_pembayaran = $order->bukti_pembayaran ? Storage::url('public/' . $order->bukti_pembayaran) : null;
    $order->user->biodata->ktp = $order->user->biodata->ktp ? Storage::url('public/' . $order->user->biodata->ktp) : null;
    $order->user->biodata->selfie_with_ktp = $order->user->biodata->selfie_with_ktp ? Storage::url('public/' . $order->user->biodata->selfie_with_ktp) : null;

    // Kirim deadline_payment ke frontend
    $order->deadline = $order->deadline_payment?->toIso8601String(); // pastikan ini yang dikirim

    return Inertia::render("Cosrent/Orders/DetailOrder", [
        "datas" => $order
    ]);
}



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
