<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use App\Events\MessageStreamed;

class StreamController extends Controller
{
    public function index(): View
    {
        return view('stream.index');
    }

// App\Http\Controllers\StreamController

    public function click(Request $request)
    {
        $playerName = $request->input('player');
        $clickCount = 1; // クリック数は常に1ですが、必要に応じて変更可能

        // プレイヤー名とクリック数を含むメッセージをイベントに渡す
        MessageStreamed::dispatch(json_encode(['player' => $playerName, 'clicks' => $clickCount]));
    }



}
