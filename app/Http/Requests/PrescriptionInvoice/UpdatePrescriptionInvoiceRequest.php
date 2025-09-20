<?php

namespace App\Http\Requests\PrescriptionInvoice;

use App\Constants\PrescriptionInvoiceStatusConstant;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePrescriptionInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => [
                'sometimes',
                'string',
                Rule::in([
                    PrescriptionInvoiceStatusConstant::PENDING,
                    PrescriptionInvoiceStatusConstant::PAID,
                    PrescriptionInvoiceStatusConstant::CANCELED
                ])
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'status.string' => 'Status must be a string',
            'status.in' => 'Status must be one of: PENDING, PAID, CANCELED',

        ];
    }
}
