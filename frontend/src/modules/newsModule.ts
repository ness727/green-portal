import { News } from "@/main";

// 액션 타입
const SET = 'news/SET' as const;

// 액션 생성 함수
export const setNews = (data: News[]) => ({
    type: SET,
    payload: data
});

// 모든 액션 객체들에 대한 타입
type NewsAction = ReturnType<typeof setNews>;

// 이 리덕스 모듈에서 관리할 상태의 타입
type NewsState = {
    data: News[];
}

// 초기 상태
const initialState : NewsState = {
    data: []
}

// 리듀서
function newsReducer(state : NewsState = initialState, action: NewsAction): NewsState {
    switch (action.type) {
        case SET:
            return {
                data: action.payload
            };
        default:
            return state;
    }
}

export default newsReducer;