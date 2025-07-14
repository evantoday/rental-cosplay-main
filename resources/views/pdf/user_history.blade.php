<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>User Order History</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h2>User Order History</h2>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Costume Name</th>
                <th>Cosrent Name</th>
                <th>Status</th>
                <th>Order ID</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $i => $order)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $order->costume_name }}</td>
                <td>{{ $order->cosrent_name }}</td>
                <td>{{ $order->status }}</td>
                <td>{{ $order->id }}</td>
                <td>{{ $order->created_at }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
