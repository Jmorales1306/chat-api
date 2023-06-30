<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Events\MessageCreated;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{

    public function index(string $channel): JsonResponse
    {
        $messages = Message::query()->with('sender', 'channel')->where('channel_id', $channel)->get();

        return response()->json($messages);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'message' => ['required'],
            'channel_id' => 'required'
        ]);

        $message = Message::create([
            'channel_id' => $data['channel_id'],
            'sender_id' => Auth::id(),
            'message' => $data['message'],
        ]);

        broadcast(new MessageCreated($message))->toOthers();

        return response()->json($message);
    }
}
