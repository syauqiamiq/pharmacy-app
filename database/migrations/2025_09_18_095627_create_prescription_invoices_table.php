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
        Schema::create('prescription_invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('prescription_id')->nullable()->index()->references("id")->on("prescriptions")->onDelete("SET NULL");
            $table->double('total_amount')->index();
            $table->string('status')->index()->comment("PENDING, PAID, CANCELED");
            $table->timestamp('issued_at')->index();
            $table->timestamp('paid_at')->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_invoices');
    }
};
