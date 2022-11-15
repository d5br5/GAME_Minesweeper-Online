# Prism Studio

![image](https://user-images.githubusercontent.com/40906871/144601334-d84a102f-6679-4dd3-8586-ffce91f747b5.png)


## 1. 개요

### About

> **MZ 세대를 기반으로 빠르게 성장하고 있는 ‘셀프 스튜디오’ 시장**
> 
- 네이버 지도 API를 기반으로 셀프스튜디오 위치, 세부 정보 등을 확인 할 수 있는 서비스
- 빠르게 성장중인 셀프스튜디오 시장 트렌드 포착 (2018년 10개 → 2021년 300개, 전국)
- 기존에 불편했던 점
    - ‘셀프 스튜디오’ 검색시 일반 사진 촬영 스튜디오에 대한 결과도 섞여 있음
    - 가격 및 위치 종합 비교 불편

• 정제된 정보를 지도 API를 통해 확인하고 비교

### Tech Stack - v1

<img src="https://user-images.githubusercontent.com/40906871/180707405-c51d7035-09f2-4c33-96fd-b8df870d4382.png" alt="drawing" width="800"/>

### Tech Stack - v2

<img src="https://user-images.githubusercontent.com/40906871/201814634-bacbf46b-cb7f-49e1-9674-c35e6c6ffd09.png" alt="drawing" width="800"/>


## 2. 특징

### Front-end

- overview
    - : 기본 css를 초기화하고, 태그별 초기 상태값 지정
    - : DB에 저장된 shop들을 모두 불러와 상태변수에 저장후 지도 API상에 마커 표시
- MUI
    - UI의 빠른 구현을 위해 세부 컴포넌트를 직접 디자인 X
    - MUI Slider, Button, Dropdown 등의 컴포넌트 활용
- Map
    - Naver Map API를 요청하여 100vh, 100vw로 배경 삽입
    - 서울 지역이 한눈에 보이도록 zoom level 적절히 설정
    - 불러온 shop들의 좌표들 각각에 대응되는 마커 설정
        - 마커 클릭시 shop의 세부 정보 표시(연락처, 가격, 주소 등)
        - 마커 클릭수 집계를 위해 firebase DB내 mapMarketCount 변수 increment event 추가
- 회원가입, 로그인
    - ID와 PW만으로 진행
    - 관심 업체 찜하기, 건의 게시글 작성 가능
- 찜하기 : 관심 업체 찜한 후 필터링 제공
- Data Loading : 최초 1회 로딩. 이후 필요한 곳에 가공하여 props 전달
- 건의 게시판
    - 고객의 소리를 듣기 위한 소통 창구 마련
    - 서비스 이용자들뿐만 아니라 스튜디오 소유자분들이 본인 업체도 넣어달라고 연락을 취하심
- Private Router
    - withUser로 컴포넌트를 감싸고, 그 안에서 auth check해서 router.replace 할 생각이었음
    - 살짝 맛보기 보여주는 것 없었으면 좋겠음 → toBe
    
        ```tsx
        const withUser = (Component: NextPage | React.FC) => {
            const User = () => {
                const router = useRouter();
                const auth = useRecoilValue(authState);
                useEffect(() => {
                    if (!auth.isLoggedIn) {
                        router.replace("/login");
                    }
                }, [router, auth]);
                return <Component />;
            };
            return User;
        };
        ```
            

### Back-end

- 데이터 수집
    - 네이버 검색되는 모든 업체를 엑셀에 리스트업
    - 업체 상세 정보(위치, 가격, 연락처, 상호명 등)을 규격화하여 데이터베이스에 저장 (v1:firestore, v2:vitess)
    - 수합된 주소는 변환 프로그램을 활용하여 좌표화하여 저장
- 스튜디오 데이터 예시
    
    ```jsx
    address : "서울특별시 서대문구 XX동 XXX"
    basePeople : "2"
    basePrice : "40000"
    contact : "010-1234-5678"
    grade : "4.96"
    lat : "37.55674"
    lng : "126.9366"
    name : "셀프스튜디오 성동점"
    reservationLink : "https://naver.me/xxxx"
    reviewNum : "23"
    website : "https://www.ootmode.com"
    ```
- 세션 vs 토큰
    - 둘다 사용? → 토큰 쓰자!
    - 받은 토큰은 ls에 절대 넣지 말 것 (XSS 방지) → 쿠키에 저장해도 XSS 위험
    - HTTP only cookie에 저장 →  CSRF 위험
    - SAMESITE cookie?
    - XSS, CSRF 공격
    - 저장위치
        - access token : local variable → recoil
        - refresh token : DB, cookie → IP 저장
- 로그인 과정
    - refresh token 발급 → DB저장, cookie 저장
    - access token 발급 → recoil 저장
- 새로고침시 권한조회
    - 쿠키에 refresh token이 있는가
        - 없으면 recoil auth 초기화
        - cookie 초기화
    - 쿠키에 refresh token이 있다면
        - 내가 서명해준 토큰이 맞는가 → verify with secret key
        - 서명이 위조된거라면 → recoil auth 초기화, cookie 초기화
    - 올바른 refresh이라면
        - db에서 refresh token 찾아서 해당 유저 find
        - 현재 IP와 refresh token에 저장된 IP가 일치하는지 비교
        - recoil auth setting → access token, expiredAt 

### 겪은 문제

- Map API
    - kakao map api 사용했을 때 문제
    - info string 내부의 ` ` 속 a 태그에 href 시 절대주소로 인식 안하고 상대주소로 인식함
    - 중괄호 ({ }) 안쓰고 바깥으로 추출하여 해결 (일반 문자열로 인식)

- Filter
    - filter 값 처리하면, 기존 핀이 사라지지 않음
    - paint map logic과 paint pic logic을 한 effect안으로 묶었음. \
- Expectation Violation: Duplicate atom key.
    - This is a FATAL ERROR in production. But it is safe to ignore this warning if it occurred because of hot module replacement.
    - 라우트 재방문시마다 atom이 재선언되어 key값이 겹친다는 오류
        - 아래와 같이 key값 뒤에 난수 부여함으로써 해결
        
        ```
        import { v1 } from "uuid";
        key: `authState/${v1()}`
        ```
        
- recoil persist
    - 목적
        - 새로고침시 url을 fetch하여 recoil 초기값 자동 세팅
    - 시도
        1. useUser를 page마다 상단에 삽입하여 data fetch를 useEffect로 수행
            - 모든 페이지에 삽입했기 때문에 페이지 이동할때마다 fetch수행 : 비효율
        2. 조건부 hook 시도
            - atom이 있다면 fetch하지 않고, 없다면 cookie 의 token 을 조회하려 했음
            - flux 원칙에 따라 조건절에 hook을 사용할 수는 없었음
        3. _app.tsx에서 useEffect 실행
            - return 문 이전에 fetch Effect 실행
            - 하지만  Rocoil, SWR Root가 return 문 이후에 있어 fetch 정보를 저장 불가
        4. _app.tsx return문 Rocoil, SWR Root 내 custom comp를 Comp와 병렬 배치
            - 병렬 배치되므로 custom comp의 fetch 정보가 더 늦게 반영됨 (순서보장안됨)
        5. Custom Component의 자식으로 Component 재배치
            - 이것도 똑같음. fetch는 되나 자동반영되지 않음 (실시간 확인 불가)
        6. middleware?
            - 이것도 근본적인 해결책은 아님. 동일 로직 항상 시행.
            - atom 값을 전달, 수정할수 없음
        7. finally….. atom state 선언시 effects로 비동기 fetch함수 전달! 공식문서 짱..
            - 하지만 next 내부 api 를 요청할 수 없었음
            - Only absolute URLs are supported
            - 아래 코드처럼 실행환경당 서버를 구분하여 해결
            
            ```
            const dev = process.env.NODE_ENV !== "production";
            const server = dev ? "http://localhost:3000" : "http://localhost:3000";
            ```
            
        8. 새로고침하면 쿠키가 사라짐
            - `path=/` 설정하여 해결
            - 근데 로그인시 api/token 을 거치면 cookie가 나타남
            - 사용하고자 할 route의 root에 지정해줘야 하는 것 같음.

### 아쉬운 점

- 개발 측면
    - icon marker 클릭 정보 창을 html 텍스트로 꾸밀 수 있는데, 이벤트 핸들러를 추가하지 못함
        - 해결할 방법이 있을 것 같으나, API 제공하는 네이버 입장에서는 보안 측면에서 막은 것 같기도 함
        
        -> v2에서 해결 : DOM 직접 생성, 수정하여 append (역시 근본 실력을 키워야 한다.)
    - 최초 로딩시 모든 업체 정보를 불러온다
        - 위치정보 선 로딩 후, 세부 정보 로딩하게 하면 좋을 듯
- 서비스 측면
    - 유료 광고를 실행하지 않은 것은 좋지만, 태워서 효과가 좋다면 유료로 해볼 것
    - 서비스가 서울 지역에 제한됨. 카테고리도 작음
    
      -> v2에서 현재 전국 데이터 수집중
    - 유료 수익 모델이 없음.

## 3. Performance


### 성과

- Google Analytics를 통해 사용자 지표 측정
- 여성 커뮤니티 위주의 non-paid 홍보
- 첫 1주일 MVP test 결과, 방문자 약 1,800명 및 서비스 업체 연결 약 9,000회
- 고객 건의 : 지역 확장 요청, 누락 업체 보완 요청 등

### 향후 확장 계획

- 셀프 스튜디오는 하나의 놀이 문화로 자리 잡았다고 생각함.
- 다양한 놀이 문화로 확장할 것임. (ex. 방탈출. 보드게임 카페. 인생네컷 자판기 등)
- 이후 서울 전 지역으로 확장 예정

### 인사이트

- 개발하는 사람 입장에서는 부족한 점이 많이 보이고, 추가해야 할 기능도 산더미인 상황인데 많은 사람들이 이용했음. 완성도를 높이는 것도 중요하지만, 일단 전체적으로 기능이 원활하게 작동하기만 해도 절반 이상은 성공
- 각 페이지별 이용자를 count했는데, 맵뷰 이용자가 리스트뷰 이용자 대비 10배 이상 많음. 리스트 페이지는 UI/UX 적으로 필요 없는 페이지. 리스트뷰를 없애고 맵뷰를 고도화하는 것이 소비자 입장에서도 깔끔하고 편리할 듯. 선택과 집중

## 4.git rule

### 메시지 구조

```
[Type] Subject
--blank line--
Body 
--blank line--
Footer(optional)
```

```
$ git commit -m "this is Subject
>> 
>> this is Body
>> 
>> this is Footer"

// Github Desktop 사용시 
// Summary(required) 란에 Type: Subject 입력
// Description 란에 Body와 Footer입력 
```

### Type
※ Type 첫 문자는 대문자 (CI 예외)

|Commit Type|Description|
|----|----|
|Feat | 새로운 기능, 코드 추가|
| Fix | 올바르지 않은 동작(버그) 수정|
| Update | 개정, 개선, 버전 업데이트, API 변동| 
|Remove | 코드 삭제.</br> ‘unnecessary’, ‘useless’, ‘unused’ 등의 수식어 활용|
|Docs|문서 수정 (Readme 등)|
| Comment| 필요한 주석 추가 및 변경|
| Refactor| 코드 리팩토링|
| Design| CSS, Image 등 사용자 UI 디자인 변경|
| Style| 코드 스타일 혹은 포맷 수정|
| Build| 빌드 관련 파일 수정|
| CI|CI 관련 설정 변경|
|Init | 라이브러리 설치|
| Chore| 그 외 자잘한 수정|

### Subject, Body, Footer

|Message Part | Description |
|-----|-----|
|Subject      | 영어 최대 50글자. 마침표 및 특수기호 사용 X</br>  첫글자는 대문자로 작성</br> 현재 시제 사용 [ Changing, Changed (x) -> Change (o) ]</br>부연 설명 필요시 Body 활용|
|Body|한 줄당 72자 내 작성. 필요시 개행 </br> '무엇을', '어떻게', '왜' 변경했는지 작성 필수 </br>가능한 상세히 작성|
|Footer | Footer은 optional</br> 참고할 이슈번호 기재</br>Ref: #이슈번호 </br> ex) Ref: #34, #23


## 5.Branch Rule

### 과정

**develop** 의 최신 commit에서 각자 작업 브랜치 생성

작업 수행 후 commit하여 develop branch에 pull request

### 브랜치 명

`브랜치레벨/작업카테고리/작업기능내용` ex) feature/new/login

| Branch Level | Description | 
|----|----|
|main | 최종 확인 완료 |
| develop | 기능 개발 및 수정, 오류 해결 완료 버전 |
| feature | 각자 작업 |

| Work Category | Description | 
|----|----|
|new | 새로운 기능, 코드 추가|
|fix| fix, update, refactor, remove 등 기능 개선 일체 |
