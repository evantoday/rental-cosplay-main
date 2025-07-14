<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Enums\OrderStatus;

use Illuminate\Http\Request;
use function Laravel\Prompts\select;
use Illuminate\Support\Facades\Storage;

class HistoryController extends Controller
{
    /**
     * Export a single order as PDF invoice.
     */
    public function exportInvoicePdf($id)
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $order = Order::where('order.user_id', auth()->user()->id)
            ->where('order.id', $id)
            ->with('costum', 'costum.cosrent', 'costum.category')
            ->firstOrFail();

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('pdf.user_invoice', ['order' => $order]);
        return $pdf->stream('invoice_order_' . $order->id . '.pdf');
    }
    /**
     * Export user order history as PDF.
     */
    public function exportPdf()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $orders = Order::where('order.user_id', auth()->user()->id)
            ->join('costum', 'costum.id', '=', 'order.costum_id')
            ->join('cosrent', 'cosrent.id', '=', 'costum.cosrent_id')
            ->select('costum.name as costume_name', 'cosrent.cosrent_name as cosrent_name', 'order.status', 'order.id', 'order.created_at')
            ->orderBy('order.created_at', 'desc')
            ->get();

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('pdf.user_history', ['orders' => $orders]);
        return $pdf->download('user_history.pdf');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $order = Order::where('order.user_id', auth()->user()->id)
            ->join('costum', 'costum.id', '=', 'order.costum_id')
            ->join('cosrent', 'cosrent.id', '=', 'costum.cosrent_id')
            ->select('costum.name as costume_name', 'cosrent.cosrent_name as cosrent_name', 'order.status', 'order.id')
            ->orderBy('order.created_at', 'desc')
            ->get();

        return Inertia::render("User/History/App", [
            "datas" => $order
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userRole = auth()->user()->role->name ?? null;
        if ($userRole !== 'user') {
            abort(403, 'Unauthorized access');
        }

        $order = Order::where('order.user_id', auth()->user()->id)
            ->where('order.id', $id)
            ->with('costum', 'costum.cosrent', 'costum.images_of_costum', 'costum.category')
            ->first();
        $order->costum->images_of_costum->transform(function ($image) {
            $image->images_link = Storage::url('public/' . $image->images_link) ?? null;
            return $image;
        });
        $order->bukti_pembayaran = $order->bukti_pembayaran ? Storage::url('public/' . $order->bukti_pembayaran) : null;

        if ($order->status === OrderStatus::AWAITING_PAYMENT->value) {
            $deadline = $order->deadline_payment;
            $now = now();
            return Inertia::render("User/History/Detail", [
                "datas" => $order,
                "deadline" => $deadline,
                "now" => $now
            ]);
        }

        return Inertia::render("User/History/Detail", [
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
