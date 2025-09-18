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
        Schema::create('visits', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('patient_id')->nullable()->index()->references("id")->on("patients")->onDelete("SET NULL");
            $table->foreignUuid('doctor_id')->nullable()->index()->references("id")->on("doctors")->onDelete("SET NULL");
            $table->string('status')->index()->comment("SCHEDULED, IN_ROOM, DONE, CANCELLED");
            $table->timestamp('visit_date')->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
