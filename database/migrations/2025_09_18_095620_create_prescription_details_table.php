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
        Schema::create('prescription_details', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('prescription_id')->nullable()->index()->references("id")->on("prescriptions")->onDelete("SET NULL");
            $table->uuid('medicine_id')->index();
            $table->string('medicine_name')->index();
            $table->string('dosage')->index();
            $table->string('frequency')->index();
            $table->string('duration')->index();
            $table->string('note')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_details');
    }
};
