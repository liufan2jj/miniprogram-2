/**
 * 验证URL格式
 */
export function urlRegExp(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
}