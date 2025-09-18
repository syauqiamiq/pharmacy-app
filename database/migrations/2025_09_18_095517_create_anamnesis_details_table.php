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
        Schema::create('anamnesis_details', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('anamnesis_id')->nullable()->index()->references("id")->on("anamneses")->onDelete("SET NULL");
            $table->string('key')->index();
            $table->string('value')->index();
            $table->string('unit')->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anamnesis_details');
    }
};
