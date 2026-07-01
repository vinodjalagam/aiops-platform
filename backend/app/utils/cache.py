from cachetools import TTLCache
from functools import wraps
import asyncio

# Cache configuration
DASHBOARD_CACHE_TTL = 30  # 30 seconds
NODES_CACHE_TTL = 60      # 1 minute
PODS_CACHE_TTL = 30       # 30 seconds
DEPLOYMENTS_CACHE_TTL = 30  # 30 seconds

# Create cache instances
dashboard_cache = TTLCache(maxsize=10, ttl=DASHBOARD_CACHE_TTL)
nodes_cache = TTLCache(maxsize=50, ttl=NODES_CACHE_TTL)
pods_cache = TTLCache(maxsize=100, ttl=PODS_CACHE_TTL)
deployments_cache = TTLCache(maxsize=100, ttl=DEPLOYMENTS_CACHE_TTL)


def cached(cache, key_prefix):
    """Decorator for caching function results with a key prefix"""
    def decorator(func):
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            # Generate cache key
            key_parts = [key_prefix] + [str(arg) for arg in args] + [f"{k}:{v}" for k, v in sorted(kwargs.items())]
            cache_key = ":".join(key_parts)
            
            # Check cache
            if cache_key in cache:
                return cache[cache_key]
            
            # Execute function
            result = await func(*args, **kwargs)
            
            # Store in cache
            cache[cache_key] = result
            return result
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            # Generate cache key
            key_parts = [key_prefix] + [str(arg) for arg in args] + [f"{k}:{v}" for k, v in sorted(kwargs.items())]
            cache_key = ":".join(key_parts)
            
            # Check cache
            if cache_key in cache:
                return cache[cache_key]
            
            # Execute function
            result = func(*args, **kwargs)
            
            # Store in cache
            cache[cache_key] = result
            return result
        
        # Return appropriate wrapper based on whether function is async
        if asyncio.iscoroutinefunction(func):
            return async_wrapper
        else:
            return sync_wrapper
    
    return decorator


def clear_cache(cache_name: str = None):
    """Clear specified cache or all caches"""
    if cache_name == "dashboard":
        dashboard_cache.clear()
    elif cache_name == "nodes":
        nodes_cache.clear()
    elif cache_name == "pods":
        pods_cache.clear()
    elif cache_name == "deployments":
        deployments_cache.clear()
    elif cache_name is None:
        dashboard_cache.clear()
        nodes_cache.clear()
        pods_cache.clear()
        deployments_cache.clear()
