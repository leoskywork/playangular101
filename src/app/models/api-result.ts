class ApiResult<T> {
  success: boolean;
  message: string;
  data: T;
}

class ApiLightResult {
  success: boolean;
  message: string;
}

export { ApiResult, ApiLightResult as LightResult };
