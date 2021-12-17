<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'thread_id',
        'user_id',
        'parent_id',
        'text'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
