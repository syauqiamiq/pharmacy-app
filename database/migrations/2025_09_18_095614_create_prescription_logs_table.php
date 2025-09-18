<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prescription_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('prescription_id')->nullable()->index()->references("id")->on("prescriptions")->onDelete("SET NULL");
            $table->string('log_description')->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_logs');
    }
};
