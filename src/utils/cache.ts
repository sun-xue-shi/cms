enum CacheType {
  Session,
  Local
}

class Cache {
  storge: Storage

  constructor(type: CacheType) {
    this.storge = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storge.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storge.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storge.removeItem(key)
  }

  clear() {
    this.storge.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
