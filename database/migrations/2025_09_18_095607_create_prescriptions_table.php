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
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('anamnesis_id')->nullable()->index()->references("id")->on("anamneses")->onDelete("SET NULL");
            $table->foreignUuid('pharmacist_id')->nullable()->index()->references("id")->on("pharmacists")->onDelete("SET NULL");
            $table->foreignUuid('doctor_id')->nullable()->index()->references("id")->on("doctors")->onDelete("SET NULL");
            $table->foreignUuid('patient_id')->nullable()->index()->references("id")->on("patients")->onDelete("SET NULL");
            $table->string('patient_name')->index();
            $table->string('doctor_name')->index();
            $table->string('doctor_note')->nullable()->index();
            $table->string('pharmacist_name')->nullable()->index();
            $table->string('pharmacist_note')->nullable()->index();
            $table->string('status')->index()->comment("DRAFT, PENDING_VALIDATION, VALIDATED, ON_HOLD,DISPENSING, , PARTIALLY_DISPENSED, DISPENSED, REJECTED, CANCELED, RETURNED, EXPIRED");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
