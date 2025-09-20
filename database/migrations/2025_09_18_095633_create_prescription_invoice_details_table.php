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
        Schema::create('prescription_invoice_details', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('prescription_invoice_id')->nullable()->index()->references("id")->on("prescription_invoices")->onDelete("SET NULL");
            $table->string('description')->index();
            $table->integer('quantity')->index();
            $table->double('unit_price')->index();
            $table->double('total_price')->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_invoice_details');
    }
};
