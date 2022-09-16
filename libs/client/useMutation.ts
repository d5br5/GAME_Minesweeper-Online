import { useState } from "react";

interface UseMutationState<T> {
	loading: boolean;
	data?: T;
	error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

const useMutation = <T = any>(url: string): UseMutationResult<T> => {
	const [state, setState] = useState<UseMutationState<T>>({
		loading: false,
		data: undefined,
		error: undefined,
	});

	const mutation = (data: any) => {
		setState({ ...state, loading: true });
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => setState((prev) => ({ ...prev, data })))
			.catch((error) => setState((prev) => ({ ...prev, error })))
			.finally(() => setState((prev) => ({ ...prev, loading: false })));
	};

	const { loading, data, error } = state;

	return [mutation, { loading, data, error }];
};

export default useMutation;
