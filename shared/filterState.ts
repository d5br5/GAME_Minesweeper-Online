import { atom } from "recoil";
import { v1 } from "uuid";

export interface FilterState {
	liked: boolean;
}

const defaultState: FilterState = {
	liked: false,
};

const filterState = atom<FilterState>({
	key: `filterState/${v1()}`,
	default: defaultState,
});

export { filterState };
