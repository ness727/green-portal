import { Image } from "@/main";

// 액션 타입
const SET = 'image/SET' as const;

// 액션 생성 함수
export const setImage = (data: Image[]) => ({
    type: SET,
    payload: data
});

// 모든 액션 객체들에 대한 타입
type ImageAction = ReturnType<typeof setImage>;

// 이 리덕스 모듈에서 관리할 상태의 타입
type ImageState = {
    data: Image[];
}

// 초기 상태
const initialState : ImageState = {
    data: []
}

// 리듀서
function imageReducer(state : ImageState = initialState, action: ImageAction): ImageState {
    switch (action.type) {
        case SET:
            return {
                data: action.payload
            };
        default:
            return state;
    }
}

export default imageReducer;