interface Item<T, U> {
    id: T;
    name: U;
    disabled?: boolean;
}
export const optionsWithDefaultValue = <T, U>(initialData: Item<T, U>[], data: Item<T, U>[] | undefined): { value: T; label: U }[] => {
    const initialOptions = initialData.map((item) => ({
        value: item.id,
        label: item.name,
        ...(item.disabled !== undefined && { disabled: item.disabled }),
    }));

    const options =
        data?.map((v) => ({
            value: v.id,
            label: v.name,
            ...(v.disabled !== undefined && { disabled: v.disabled }),
        })) || [];

    const uniqueOptionsMap = new Map<T, { value: T; label: U; disabled?: boolean }>();

    initialOptions.forEach((initialOption) => {
        if (initialOption.value !== undefined) {
            uniqueOptionsMap.set(initialOption.value, initialOption);
        }
    });

    options.forEach((option) => {
        if (option.value !== undefined && !uniqueOptionsMap.has(option.value)) {
            uniqueOptionsMap.set(option.value, option);
        }
    });

    return Array.from(uniqueOptionsMap.values());
};
