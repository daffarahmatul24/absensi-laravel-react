<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ramsey\Uuid\Uuid;

class Attendance extends Model
{
    use HasUuids;
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'address',
        'status',
        'description',
    ];

    public function newUniqueId()
    {
        return (string) Uuid::uuid4();
    }

    public function user()
    {   
        // table user,table attendance
        // table user adalah data utama (id)
        // table attendance adalah data turunan (user_id)
        return $this->belongsTo(User::class);
    }
}
