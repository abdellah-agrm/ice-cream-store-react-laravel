<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class ClientsEmailsController extends Controller
{
  public function jointCustomers(Request $request)
  {
    try {
      $email = $request->input('email');

      // Path to the CSV file
      $filePath = public_path('data/jointCustomers.csv');

      // Append the email to the CSV file
      File::append($filePath, $email . PHP_EOL);

      return response()->json(['message' => 'Email saved to CSV file!']);
    } catch (\Exception $e) {
      return response()->json(['error' => 'Internal Server Error'], 500);
    }
  }

  public function downloadCsv()
  {
    try {
      $filePath = public_path('data/jointCustomers.csv');
      $headers = [
        'Content-Type' => 'text/csv',
        'Content-Disposition' => 'attachment; filename=jointCustomers.csv',
      ];

      return Response::download($filePath, 'jointCustomers.csv', $headers);
    } catch (\Exception $e) {
      return response()->json(['error' => 'Internal Server Error'], 500);
    }
  }
}
