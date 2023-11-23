// 액션 타입
const ADD = 'page/ADD' as const;
const SUB = 'page/SUB' as const;
const RESET = 'page/RESET' as const;

// 액션 생성 함수
export const addPage = () => ({
    type: ADD
});
export const subPage = () => ({
    type: SUB
});
export const resetPage = () => ({
    type: RESET
});

// 모든 액션 객체들에 대한 타입
type PageAction = ReturnType<typeof addPage> | ReturnType<typeof subPage> | ReturnType<typeof resetPage>;

// 이 리덕스 모듈에서 관리할 상태의 타입
type PageState = {
    page: number;
}

// 초기 상태
const initialState : PageState = {
    page: 1
}

// 리듀서
function pageReducer(state : PageState = initialState, action: PageAction): PageState {
    switch (action.type) {
        case ADD:
            return {
                page: state.page + 1
            }
        case SUB:
            return {
                page: state.page + (state.page == 1 ? 0 : -1)
            }
        case RESET:
            return initialState
        default:
            return state;
    }
}

export default pageReducer;