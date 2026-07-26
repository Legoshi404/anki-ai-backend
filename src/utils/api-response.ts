export class ApiResponse {
  static success<T>(data: T) {
    return {
      ...data,
    };
  }
}
