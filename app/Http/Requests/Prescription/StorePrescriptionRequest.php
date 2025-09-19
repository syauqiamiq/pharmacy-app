<?php

namespace App\Http\Requests\Prescription;

use Illuminate\Foundation\Http\FormRequest;

class StorePrescriptionRequest extends FormRequest
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
            'anamnesis_id' => 'required|string|exists:anamneses,id',
            'doctor_note' => 'nullable|string|max:1000',
            'status' => 'nullable|string|in:pending,approved,dispensed,completed,cancelled',
            'prescription_details' => 'nullable|array',
            'prescription_details.*.medicine_id' => 'nullable|string',
            'prescription_details.*.medicine_name' => 'required_with:prescription_details|string|max:255',
            'prescription_details.*.dosage' => 'required_with:prescription_details|string|max:255',
            'prescription_details.*.frequency' => 'required_with:prescription_details|string|max:255',
            'prescription_details.*.duration' => 'required_with:prescription_details|string|max:255',
            'prescription_details.*.note' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'anamnesis_id.required' => 'Anamnesis ID is required',
            'anamnesis_id.exists' => 'Selected anamnesis does not exist',
            'doctor_note.max' => 'Doctor note cannot exceed 1000 characters',
            'status.in' => 'Status must be one of: pending, approved, dispensed, completed, cancelled',
            'prescription_details.array' => 'Prescription details must be an array',
            'prescription_details.*.medicine_name.required_with' => 'Medicine name is required when prescription details are provided',
            'prescription_details.*.medicine_name.max' => 'Medicine name cannot exceed 255 characters',
            'prescription_details.*.dosage.required_with' => 'Dosage is required when prescription details are provided',
            'prescription_details.*.dosage.max' => 'Dosage cannot exceed 255 characters',
            'prescription_details.*.frequency.required_with' => 'Frequency is required when prescription details are provided',
            'prescription_details.*.frequency.max' => 'Frequency cannot exceed 255 characters',
            'prescription_details.*.duration.required_with' => 'Duration is required when prescription details are provided',
            'prescription_details.*.duration.max' => 'Duration cannot exceed 255 characters',
            'prescription_details.*.note.max' => 'Detail note cannot exceed 500 characters',
        ];
    }
}