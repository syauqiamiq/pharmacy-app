<?php

namespace App\Http\Requests\Patient;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePatientRequest extends FormRequest
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
        $patientId = $this->route('patient');
        
        return [
            'name' => 'string|required|max:255',
            'medic_record_number' => [
                'string',
                'required',
                'max:50',
                Rule::unique('patients', 'medic_record_number')->ignore($patientId)
            ],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama pasien harus diisi.',
            'name.string' => 'Nama pasien harus berupa teks.',
            'name.max' => 'Nama pasien maksimal 255 karakter.',
            'medic_record_number.required' => 'Nomor rekam medis harus diisi.',
            'medic_record_number.string' => 'Nomor rekam medis harus berupa teks.',
            'medic_record_number.unique' => 'Nomor rekam medis sudah terdaftar.',
            'medic_record_number.max' => 'Nomor rekam medis maksimal 50 karakter.',
        ];
    }
}