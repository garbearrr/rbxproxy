-- Compiled with roblox-ts v2.2.0
local function Proxy(target, handler)
	if handler == nil then
		handler = {}
	end
	-- State of the proxy
	local _object = {}
	for _k, _v in target do
		_object[_k] = _v
	end
	local state = _object
	-- Metatable to override property accesses and modifications
	local meta = {
		__index = function(_self, key)
			if handler.get then
				return handler.get(state, key, function(key)
					return state[key]
				end)
			end
			return state[key]
		end,
		__newindex = function(_self, key, value)
			if handler.set then
				return handler.set(state, key, value)
			end
			state[key] = value
		end,
	}
	-- Methods to manipulate the state
	local methods = function(localState)
		return {
			set = function(self, key, value)
				localState[key] = value
			end,
			get = function(self, key)
				return localState[key]
			end,
		}
	end
	local _object_1 = {}
	for _k, _v in state do
		_object_1[_k] = _v
	end
	for _k, _v in methods(state) do
		_object_1[_k] = _v
	end
	local mod = _object_1
	return setmetatable(mod, meta)
end
return {
	Proxy = Proxy,
}
