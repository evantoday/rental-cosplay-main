<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Laporan Cosrent</title>
    <style>
        /* Reset dan Basic Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            padding: 20px;
            font-size: 12px;
            /* Ukuran font lebih kecil */
        }

        /* Heading Styles */
        h1 {
            font-size: 18px;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 16px;
            margin: 20px 0 10px 0;
        }

        h3 {
            font-size: 14px;
            margin-bottom: 20px;
            color: #666;
        }

        /* Table Styles */
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
            font-size: 10px;
            /* Ukuran font table lebih kecil */
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 6px 4px;
            /* Padding lebih kecil */
            text-align: left;
            word-wrap: break-word;
            /* Memungkinkan text wrapping */
        }

        th {
            background-color: #f8f9fa;
            font-weight: bold;
        }

        .total-pendapatan {
            font-weight: bold;
            text-align: right;
            margin-top: 20px;
        }

        /* Kolom spesifik */
        .no-column {
            width: 5%;
        }

        .kostum-column {
            width: 15%;
        }

        .kategori-column {
            width: 10%;
        }

        .penyewa-column {
            width: 12%;
        }

        .whatsapp-column {
            width: 15%;
        }

        .tanggal-column {
            width: 12%;
        }

        .harga-column {
            width: 12%;
        }

        .status-column {
            width: 8%;
        }

        /* Alert ketika tidak ada data */
        .no-data {
            padding: 10px;
            color: #666;
            font-style: italic;
        }
    </style>
</head>

<body>
    <h1>Laporan Cosrent: {{ $cosrentName }}</h1>
    <h3>Tanggal: {{ \Carbon\Carbon::now()->format('d M Y, H:i:s') }}</h3>

    <h2>Confirmed Orders</h2>
    @if ($confirmed_orders->isEmpty())
        <p class="no-data">Tidak ada orderan terkonfirmasi.</p>
    @else
        <table>
            <thead>
                <tr>
                    <th class="no-column">No</th>
                    <th class="kostum-column">Kostum</th>
                    <th class="kategori-column">Kategori</th>
                    <th class="penyewa-column">Penyewa</th>
                    <th class="whatsapp-column">WhatsApp</th>
                    <th class="tanggal-column">Tanggal Rental</th>
                    <th class="tanggal-column">Tanggal Kembali</th>
                    <th class="harga-column">Harga</th>
                    <th class="status-column">Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($confirmed_orders as $index => $order)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $order->costum->name }}</td>
                        <td>{{ $order->costum->category->name }}</td>
                        <td>{{ $order->user->name }}</td>
                        <td>{{ $order->user->biodata->phone_whatsapp }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_mulai_rental)->format('d-m-Y') }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_kembali_kostum)->format('d-m-Y') }}</td>
                        <td>{{ number_format($order->costum->price, 0, ',', '.') }}</td>
                        <td>{{ $order->status }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <h2>Done Orders</h2>
    @if ($done_orders->isEmpty())
        <p class="no-data">Tidak ada orderan selesai.</p>
    @else
        <table>
            <thead>
                <tr>
                    <th class="no-column">No</th>
                    <th class="kostum-column">Kostum</th>
                    <th class="kategori-column">Kategori</th>
                    <th class="penyewa-column">Penyewa</th>
                    <th class="whatsapp-column">WhatsApp</th>
                    <th class="tanggal-column">Tanggal Rental</th>
                    <th class="tanggal-column">Tanggal Kembali</th>
                    <th class="harga-column">Harga</th>
                    <th class="status-column">Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($done_orders as $index => $order)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $order->costum->name }}</td>
                        <td>{{ $order->costum->category->name }}</td>
                        <td>{{ $order->user->name }}</td>
                        <td>{{ $order->user->biodata->phone_whatsapp }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_mulai_rental)->format('d-m-Y') }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_kembali_kostum)->format('d-m-Y') }}</td>
                        <td>{{ number_format($order->costum->price, 0, ',', '.') }}</td>
                        <td>{{ $order->status }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    @php
        $totalPendapatan =
            $confirmed_orders->sum(function ($order) {
                return $order->costum->price;
            }) +
            $done_orders->sum(function ($order) {
                return $order->costum->price;
            });
    @endphp

    <h3 class="total-pendapatan">Total Pendapatan: {{ number_format($totalPendapatan, 0, ',', '.') }}</h3>

</body>

</html>
