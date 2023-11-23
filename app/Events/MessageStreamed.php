<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MessageStreamed implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public mixed $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function broadcastOn(): Channel
    {
        Log::info('stream');
        return new Channel('stream');

    }
}
