-- Compiled with roblox-ts v2.2.0
local function Proxy(originalModule, fn)
	local ProxyOptions = {
		Cancel = false,
	}
	local wrapped = {}
	-- Iterate using pairs() for object keys and values in Roblox-TS
	for key, value in pairs(originalModule) do
		local strKey = key
		if typeof(value) == "function" then
			wrapped[strKey + 1] = function(...)
				local args = { ... }
				ProxyOptions.Cancel = false
				-- Call the proxy function
				fn(ProxyOptions)
				if ProxyOptions.Cancel then
					return nil
				end
				-- Call the original function
				return value(unpack(args))
			end
		else
			-- Copy over non-function properties
			wrapped[strKey + 1] = value
		end
	end
	return wrapped
end
return {
	Proxy = Proxy,
}
