import { useEffect, useRef, useState } from "react";

/**
 * useThrottle
 * : 주어진 값(상태)가 자주 변경될 때
 *   최소 delay(밀리초) 간격으로만 업데이트 해서 성능을 개선한다.
 */
function useThrottle<T>(value: T, delay = 500) {
  // 1. 상태 변수: throttleValue: 최종적으로 throttling 적용된 값 저장
  // 초기값을 전달 받은 value
  const [throttleValue, setThrottleValue] = useState<T>(value);

  // 2. Ref lastExcecuted: 마지막으로 실행된 시간을 기록하는 변수
  // useRef를 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고, 변경되어고도 리렌더링을 트리거 하지 않음
  const lastExecuted = useRef<number>(Date.now());

  // 3. useEffect: value, delay가 변경될 때 아래 로직 실행
  useEffect(() => {
    // 현재 시각과 lastExecuted.current에 저장된 마지막 시각 + delay을 비교
    // 충분한 시간이 지나면 바로 업데이트
    if (Date.now() >= lastExecuted.current + delay) {
      // 현재 시간이 지난 경우, 현재 시각으로 lastExecuted 업데이트
      lastExecuted.current = Date.now();
      // 최신 value를 throttledValue에 저장해서 컴포넌트를 리렌더링
      setThrottleValue(value);
    } else {
      // 충분한 시간이 지나지 않은 경우, delay 시간 후에 최신 value로 업데이트
      const timerId = setTimeout(() => {
        // 타이머가 만료되면, 마지막 업데이트 시간을 현재 시각으로 갱신
        lastExecuted.current = Date.now();
        // 최신 value를 throttledValue에 저장해서 컴포넌트를 리렌더링
        setThrottleValue(value);
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttleValue;
}

export default useThrottle;
