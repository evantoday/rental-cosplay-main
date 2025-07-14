<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice Order #{{ $order->id }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <h2 style="margin-bottom: 0;">INVOICE</h2>
        <p style="margin: 0;">Order ID: <strong>{{ $order->id }}</strong></p>
        <p style="margin: 0;">Tanggal Invoice: <strong>{{ date('Y-m-d') }}</strong></p>
        <hr style="margin: 20px 0;">
    </div>

    <div class="section">
        <h3 style="margin-bottom: 8px;">Penyewa</h3>
        <table>
            <tr><th style="width: 150px;">Nama Penyewa</th><td>{{ $order->user->name ?? '-' }}</td></tr>
            <tr><th>Email</th><td>{{ $order->user->email ?? '-' }}</td></tr>
        </table>
    </div>

    <div class="section">
        <h3 style="margin-bottom: 8px;">Detail Kostum</h3>
        <table>
            <tr><th style="width: 150px;">Nama Kostum</th><td>{{ $order->costum->name }}</td></tr>
            <tr><th>Brand</th><td>{{ $order->costum->brand }}</td></tr>
            <tr><th>Kategori</th><td>{{ $order->costum->category->name ?? '-' }}</td></tr>
            <tr><th>Ukuran</th><td>{{ $order->costum->size }}</td></tr>
            <tr><th>Harga Sewa</th><td>Rp {{ number_format($order->costum->price,0,',','.') }}</td></tr>
        </table>
    </div>

    <div class="section">
        <h3 style="margin-bottom: 8px;">Detail Penyewaan</h3>
        <table>
            <tr><th style="width: 150px;">Status</th><td>{{ $order->status }}</td></tr>
            <tr><th>Tanggal Mulai</th><td>{{ $order->tanggal_mulai_rental }}</td></tr>
            <tr><th>Tanggal Kembali</th><td>{{ $order->tanggal_kembali_kostum }}</td></tr>
        </table>
    </div>

    <div class="section">
        <h3 style="margin-bottom: 8px;">Penyedia Kostum</h3>
        <table>
            <tr><th style="width: 150px;">Nama Penyedia</th><td>{{ $order->costum->cosrent->cosrent_name }}</td></tr>
            <tr><th>Alamat</th><td>{{ $order->costum->cosrent->address }}</td></tr>
            <tr><th>Nomor Telepon</th><td>{{ $order->costum->cosrent->telp_number }}</td></tr>
        </table>
    </div>

    <div class="section" style="margin-top: 32px;">
        <table style="width: 100%;">
            <tr>
                <td style="text-align: right; font-size: 1.1em;">
                    <strong>Total: Rp {{ number_format($order->costum->price,0,',','.') }}</strong>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
