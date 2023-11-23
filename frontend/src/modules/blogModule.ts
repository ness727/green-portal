import { Blog } from "@/main";

// 액션 타입
const SET = 'blog/SET' as const;

// 액션 생성 함수
export const setBlog = (data: Blog[]) => ({
    type: SET,
    payload: data
});

// 모든 액션 객체들에 대한 타입
type BlogAction = ReturnType<typeof setBlog>;

// 이 리덕스 모듈에서 관리할 상태의 타입
type BlogState = {
    data: Blog[];
}

// 초기 상태
const initialState : BlogState = {
    data: []
}

// 리듀서
function blogReducer(state : BlogState = initialState, action: BlogAction): BlogState {
    switch (action.type) {
        case SET:
            return {
                data: action.payload
            };
        default:
            return state;
    }
}

export default blogReducer;