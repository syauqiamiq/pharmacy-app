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
        Schema::create('anamneses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('visit_id')->nullable()->index()->references("id")->on("visits")->onDelete("SET NULL");
            $table->foreignUuid('doctor_id')->nullable()->index()->references("id")->on("doctors")->onDelete("SET NULL");
            $table->string('patient_complaint');
            $table->string('present_illness')->nullable();
            $table->string('past_illness')->nullable();
            $table->string('allergy_history')->nullable();
            $table->string('family_history')->nullable();
            $table->string('medication_history')->nullable();
            $table->longtext('physical_exam');
            $table->longtext('note');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anamneses');
    }
};
