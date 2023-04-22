
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  findSync
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.13.0
 * Query Engine version: 1e7af066ee9cb95cf3a403c78d9aab3e6b04f37a
 */
Prisma.prismaVersion = {
  client: "4.13.0",
  engine: "1e7af066ee9cb95cf3a403c78d9aab3e6b04f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


const dirname = '/'

/**
 * Enums
 */

exports.Prisma.PluginScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  contrubutorIds: 'contrubutorIds',
  version: 'version',
  authorId: 'authorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});


exports.Prisma.ModelName = {
  Plugin: 'Plugin'
};

const compressedDMMF = 'N4IgJghgLhC2D2YCmAbEAuUSB2BXWAzhgNoC6ANCAsikesaNnEhiAAoq4DmAltiJTAAjAHLMMeFCkoAzHqjB0GIJrBboQPMAJABrPto0EAxhBQQATjp4EAMjagYZZgkko2ASkgCOuHhaRDKAtcN00CAFVsHl91Z1owmwBJIJDEgi8IMAB5bBQATycXMIALCAIAESRnXBQoADUzUIxg0MoofIAHdRAAZWC+Lh1kGrqMRnENYz9tSksuJVIAX3cCAHEcJAtoQKKE1YjOyChAgEFHdHjXFYm1VlUWSn1sQxATM0trOwc911WvXz+XboVrpKIxZogtKrFK/dKZHJ5QqXYqUMqVaoQWoNJpxVEgDrdVj9CyDL4bbBbHaGK5go7U85wm4qSbgJAmUmdKA8eD8J4GVjvcxWVb2AgXWn/Hx+AKpNrhcGxOEwmn4zxILK5ArKkDoqqjHGcPH7AldHoksmrClUk6qk02Q7HM4S4rMh6sYy81pCXBQeAWFJEfkvQWmYVfMUXUFSwGylrQhXRJUo+0EWEpv7hBFa5GS3XlfVYuqNI06wnmgbYIZWzbbW06h3022MjNIN2sgBuWwIPL5egFRjDn1FP1bMZlwOjiYhxszyTtc4yGsR2rH+YxBpLkLz5eJler4WtdeBecbTrALdp7buGixUBK/thwdeQuH4UjDaXscnCYdSe3appgu8LLjmOp6pi2JbrOYS7hoFpVuStbUp+joMi6CTXj0xgBOhOjPC+Q4iu+o6nl+E5ymC/4wSqn7Zki4EFpBxa4vG8pwSAFQ7AAKjwdyCMxFy3D02DwAA7jo8yLCsh7IfWa5nnhrZYawuBNs6+EDm8RERqRgEAhRbFUTOn7pmR9GrnmEGbqxa4cVxJy8fxsmUsewEHOpF5RmkSwUCAnSkrAlj5AA0kgyKSNIIC4NRABi8goIoJB+TFM5JC8SAAB7sslNauShyl+eW0mUCYJRIEF4yaNgnS+tkQgAFZIMYUDcWadCgAFNiVfQwmsBw3B8AA6uVATpbVjiUGoMBVQQ8C4BYxg9ANvD8DJnrYOK2x8FAHVUBAmUiPg8UKHQkVTXwR2wCdiVnbUKAyXIp0kH1GinCIFRfAZQLueER1SBAQgoDR1UTW13RKKAHErcNo1IONvo6A8BCdBAS2sF1BCVZQKDwKY3K8qwfATfVTUteDOUjuKTLkFDZr9Zwq0jVs8M1YjlDI6j6MaJj2MgLj+O9kTbNQKTzWte1unU1CoS+SpGjZB4X3Sj9n7/eYQMg8TvoU5DppEhoMPYMzY0i0jzAo2jPS8xAOgC9AQsaNrouNeLutS95svLLTLI3iAIjZNxyvfr9Njq4DwMNiL7u9fry2M7DLMI5Nvvslz1ukljts43jDuE07Iti+TktUxh1w+9DCfG3Dyfm2olvc/5md8/bBP8AXJOu8XEMe0Zcs++6TuzFmKtxgpBDh5rUdg5LsccQhXDxXUWx12nVsY832f87nbfC53ZMSz3pc03TBt9Puds7472kfMRNgfoV8up8Hhnj5PkcKdHs/KPP+5LycxFObrx5pvS+gt86gzql3Q+lMSLSyvBXem8EL453Ae3G+4Zj6PwHqyZAHIeBciFuOVWb97oRy1l/Huc8kHn1JFWf+K8OYW3ThvbqW9W7X2dkXGBQY4FlzbIgs+C8wF53Qa+O+3x4Gum9q9EAG1vS+kfElYhY8yLvwoTPKhP8aEL3UZGBhgDmHAKbmwkRu8O5QIPu7LBV4ZHPw0F2CwPZCYqJPIBdR08dbf1PhWOhi8eDL0MfXFhIDTGoNEXvSxbsS58JPnHPcfizHX3Eb3bBsi7wPgDMPdUIc1ZkKnp/TROVqFCL/gEgBq8G4ZzCdvNBkSXZWJiffPSmFBG+MtLUiJg5b6pNsU/HCGpmwpxya/NR+SP6nkocU7RZ8HJICckgAxlSQkmKzkkiBXDoHWNicpNprA5kLPWWInSNjpFPzUueRkrjQ4T3GRorxWifH7J4nxRZ5TGGpyqawtZ4TzGQIadEo+OyEFPI0Ac15RzQw9NOZhZYdjB7sCrtkCwyALAACF8hDR4PeLw5g2610oBtLaEAdp7SCodY6CUkroAAIwXWwFdG61KAAMj0qV6wRVoF+JCxkAwKZMopet57+lFiij5QDG420hRoHA+BtnNKkbCp+7prl5L5RMtUUyhU6JFci1FyzjFSt+dfWVsB5WSP4f3WReCcIEN3qq0h6r7k8JevE+CuqxVBLXpK0BxqIGmvNQ/PpOC/byJCD6P0WTeEjJ5e4u5niXUlPNB6/VTDgmGt9Z0v5AamkWqZPCzs3YiEj1yY6jWGr7RatdcKiworU2fJWUarNJq8BmtzUGs5IaegZKUdy1RcanUJpjjM5Nta9XiqMT6mpHD/WtsDS064BbQ24SGX2txqYPGFIedM0FfQU0TvTVOn5zbZ1yvbQutsS6egXLwg63l5bnXDt3b0fdXqvmhOPTO9BOagUKstXCp+RsTZIEVKEAlcjeTEtJVVcljL2UYDpVQS6lLnq0rZah5QnLsnkVjRu+NW7E0joSR0r9ULMHAs7bIlVJbRkDofUO7xbraEkavhAlJMLF1WvsYiwa2Bx3osxdikopwuBcACFwUR4GiXBBJdgXaMGDpwdQ4h2AyHrrwfQKy2QGnMOsi5Xeuj5CGOPKYy+sdnqDVHpbqx79c7z2Ks412+44gDN4cHQRp9pnX2WeqZ+mzrAf2wL/fmp+NrOT2po7hxcm6BXbu1UI7zabvW+es3UmVdnf15rSdxsNuAI1KOjTh/tbn6MecYzWutB7kvfNS10kAgXCsdqVU5hxRaXGReK9F/DsXCPPsSw2jN07/PpbPZlprjn0m+kyU+Dr66uvuZ655ir/GfM1fYcN+rGWgtZeDbIgZt7Zs3Ji5qwV1adXmfrRKlL620ubdG9t8bl7zmeSuYdtVpXFvlfO5Vt9jbM2kZG22sbF6uMIoAPqehisMorc30jHcradpNDNeMAGF5pyf4xikTYmkASZOOBq7a3pX/O4fOhzT2WsgDB+StdR3usnbi2ds+RsACyB1Mf5Gx+JnYBPJ3XeJ5sxpwPyeg9ZNTvgtP3tGbKyZyuvGWd8A51z3HPOzZJffas2rfzBeAoeyDgDlOja9CIsBrF95ld4/ZOB6attMBvHmoteOvGQDrUgzJ6DdvYModuhIe69KlM+/QJFdDgfdN+3ep9Vz82PsM960xo3Ju4Zm+E6J7nJw0xq4G1Zm7dWdfdz1yLvZhsq7G9vqboTFudgZ4mqtj9WvOGFy2fZz2FPZGK0l2W6Xn3Zc0IT2XpPFfU8q/T7zw9/O/XoLzy6rBoJRd+wDkHKPcP6cI8Z0j4vvHS/CnL+boflvq/syz+Pk9k/G9C4L5aovPHVpb8sDvlPOP9+j+q3XnP2uz+68a6OWfV6ibYe+p1svgtrHktjovuMnpXunksurn9kNrdlPmTpfs+igifmRm+MFtlgitRjGoAasPDnOFWuvsxlWBAXvlXtAUfkThPvUqTs3nEr/IktQd0uRhgbttxmFnasWjgbDngSvgQYjkRsgn4qQY/uQe8r9oNn5vAR/vnl/oXsgYwagcwegTtpRjll6OGoolGh3vel3iAV9qUn4nog4BQYTq/gLjIdPhRs1rIo4s4n2NwXTsAavnHgwYMCIWnuyKYXzlQUoSTk3sLkgaZigQDhgioY9nPt2lNr2kvrwc4fwWvoIcQVwB4cPl4eIbXprm/g3vvJ/r0q6FfsIkwWERIhEb/lMCuhpLEX9HwYkIQUkeCmoKkfvt4WPr4aEQgXQbsruo0Y8H4extYRNtxjequtUWHLUe4PUT0S8k0YPqIVARkTAZIfXhspYYgfQTQr0cTgMawWcuUdfnwCjpUVJm7ttHJmSopt7tSudEhgylcXdFICHtSmHj0Ppm9p3vyvoT3oYSxrdjsaoTYdxtgTDpRHETHi4aAT8YhMUf8WUaFuyLaoQu1o4UZGCXoRCQYe0tCf0ScoMa3uoXJpoZGoGDoYZp8Rid8U7qtEcYMs1BoXlloYGM/hrk2h0WsV0SCsEYoaEbCd/j5PsXYVwSCaiTUfEXUQIQob8XVrySLvsT2lkh3lOOMWKZMRKVyVKX8jKf+v0pUV5KSSVuiQka4ZsTMX0TybibsYCQiiMVUe8boeSUaZCT0FsTCRaQCZxvsUbFEMYOVMYLoIEDSarjXoSqcbJvJp7pcepqhjcapncVGYHsHtphhrIm8SiR8RWo6ZicRtieadCniZEc5s5GmUqbciqf8k6dmQeLmSwe6fiQihwUiQ4cKTLEAeCZmZSZWdsW6XCZTrlvltoWMaWW2eKYkbukbIGScH2YyYoMybAVIbnuyYERsVCVWRtlqX3AKW1k2QAT+PKMqcOaqaOeqTmWud2frk/PKTNsWb+EOYaSOcaSuV2XmZaUMQivtqMXaWSRmfeRWWCqaU+TWT2bIjaXqYOfgT+VmX+Y5BCq6c+bWXLJ6VXGhPjpntJmceGaAF7vGdcX7rcQHjhY8UmaHimf/qPDwaKQeeWZBckQBeESDoUWUgoMhUgNkN0HWL2AfinGYVkRYbkbIfkVaayMCTuU4ZRc7L+TRbBYBfRZKfQlSsxaxTaBxbOcsdkasXxVYS+XWbggieFkKSJVLg6RBR2UIRqckmefIcef4kxepIpexZBipdnrxVEvxRxtpaGvSf2SSWBRMVRSZQcdgMxVOcSTOZntxayRtp0Uud0VZbRaUXyV7E/IKcic2fad+YeQ+ViauX8RZUEW4XJTZU6HZaIpxZkRFdIRpesZgayJeaRaWmlY+tRUUTiXBREQxX4kygpWxSVY5cfmyZVRyWoW+bqa9mmQ1cZjukxi6S1dJZZfZKaZ1bZd1W3KVUsU5cUVFRfiFpTiBaNalV+Y1f5dNdWXRXNSadBWoItUVctcpWFT4eYRtYuVtY/Ihbxt6b6f6WAMxScZtO7ucQphSthQ8VFLGfhcDU8RynpnVbRgaUZRlRJc1SdfFWdSuVdTsMVStb1e0ZFU9XIdqZTsJWRaJXefDU1SEaea1TJVZWjScBjbdcGZQQ9X4ZtXjdtdarpZwSlQZemYdZNfldldKblcuVlTTSxTdQ5XdW0Uzf1S5ZpfBfscFQVvqdHiTX5Xzb3khepIrVGljdLTjQNdFZyfzXFakj/klVucra2areJWTdyRTbNXlWAR1fJUtUpRLQzeFf9vrbLVVWwQirVZbWiXDWrfFllSbW5cyPzaLXTe7Yfp7XAQuQbc9X7ayO+baWNQdRNaHc8hdWafbadY7bMgtS7ddW7ZtLrTxY9UnazdVX7LtdDtzeNTLurUXbneHfmVfr0dHeLeXZLS/pXczbjQJR6YBlXBOUgGztgPkD9VBv9RGYDUysDf7vcb7oRSAE9MRdxqmftbDelSHUzmHVJQXWzUCS5u8SWeBaTf5Yjfncjfjezfgo2YqTeZffvUQTfTlZTbKf0p5dOYVo3Znc3dnRvtSZUdrUyX3SyV7RVT7YNa0rJQLZqULS2QWa1k4vpUTSKfudbVMbFUfXfSff7dEQqQ6hfb5TbdfeTZ/Q7YQ6nSNQ3ZgzzVnQfTnfMjBTNcfbXdei9gw/VYA93i3c6f+fg8PU9q9atMxZPfkCzr6JJqhaGR7phZGYvavSDWpio0HvdBDa6lhoHRRTg2qcbSIxHe1YMN3WXatYzQPTLQCq5fmfsYTXw7vbzcA5JRwwQzFVHSXejT3ZY/HfOe/tXaI6g2yI/RFhnc48w+/VQ4LV/YXSLd47Tb4xXeVYnbA4bUNanb/SFf/Yw03QI6416VrdkwVik9A2k7Y3LW1Qg+3RgWbZTslduXk/w18YI52cYx3Qg+Y/Zb3R7fddY97ZU77Zk37AHT5WWRQ206ZSedQ5w0bU7WY4k2LRY2UwnYE+k8nSM9hPQ3o9g8HZM648dbfcE53cXYVT4ys5A3OSsafkExHfsfXbs7efs7g/NW3R01pZHedWw5dUszHb03Hf06k+s0M3AyPYbkhdgD6c1J9ZIxAFPTPX9RhftAvRpjGeo2i1o0Rc8SRU86/Qcyw9M4g+ZXE8LZWd0z1Vc6pc5aCxk4JX7I4zDSrS84YwszM7EzQ542y9ZYlF1Zc301LQMzA7S5s/Sz0A2eEzvcy3vQS9E3bbMx4/M6jX88k1S+tYPXc/Yz/YSQyTk3i+Q68xrW9cUzq15aFQK/3cCzkRszXUq4fe46bfyebeg1zc05E0A4S240jSc10yq/y4C4K1a+pTa8E3KcQ1eVK1bSy0eUYw6yY76+c0k/61xUC+UyC7QXS6+XQ7SaBZ+e6wU560cwqz61NWc7y67T0346m2s9ayK7a1s6pDw/qxM4a63T83ncW/G6W7nRS5jWq31YMxm6K+C7IgvBQWhWGRcai9GbhaDSvZo2vRvTi9xtKC4M22Ja2/a96/c0/BLuMxu6y4+R81lvU1RvAFAOlOuwYzG9y7Uye065TmMPu9e5le03G1q4+ycFe9G6+0S3e0BdxlwLw0y1GzK5u2+9ux+7IkB30RE9Ky456x/Ry3Mw21MF6LJrk04/B1E0kUh0g6S1w4KDALWgQMnt+2B4e1u8czu5TjgIoGR8+z+wjTE/h5yynX7NQLB5G0HRRze2fAAIqhAWDSOIB9H+M3MBZbb1tiv3DnvkcIdytmVsbIN2usAiDsi2hjuLFWNBu3Mhs7v7G6J3L6LacTuKMotg0IbL1A0IbaOxwIqru0DydYPgd/vHsPyz5X7qz/vnmU7ojOctlX1TNevUedNMbefue+eyLogACijihQjHvHv7IXnbOyp73G6IL6RZ3H+jTHttSnxyBH6XnKBAMXsAXICXeb2HHrRBaK8A8AwM8LPn39+xXdpnCjc9Sj07CZs7GLM7i7OmsijnmHIHPHCnDRwj77nz+xe7VXoH430x7zU397iVBN57l7iXC33b7bzXLeITT7c3Y3OHi3O3kX39n7XHAD+brThzk3kH03T8QHAXBbRBRbyHirqHIAMHz3N3hbd3oXD3a3wHUW83x323hyZ38TanGngQbXgSZVabtbQ70nI73G456OP2WOZBKFDNZnnXFn87KmfXgeNKdnLxf+P3FJwXZmP2CPNbp6QOw77lIkZ9cHoPNXuH/W4naltm92KPzPrAErGDWH7PL3nPF2VWUD9PvPjP/PIT4Dyih3uXSXCNXP1bATLafPobzr9hlP7Z1PavgbiPDPwzMnt44b0NIPR3HPfWEvEh6roRDW2vvZOzm3YPy2Fma1A7t2TvNHwFTbbvNvXmdvdPGvJvYLYjo98u7OnqWP8xrMuPHXyLWFGjRPcZqfZPuLgfYvtvtPXv2NPvUnzvVGrPOXezKvTVhvlrxvMvpvWbfsQvrrIv1vOfwfefOnNfknWvfv3GjTevxlBvIf+fethf3fUH3GYzSv5fW3Hvl26vEngOdfAvFRObe1V31Xrfs/kv1zPPXfsvxfwxAfU/zzFf19VfUvYftfEfCFUfq0CufGsfnO2PCfh+ePyfyjGmaflnaG2LkNfs296/UXr93frn8d+xOX3uPywKl9ABLfYAeL3b7c9wBRfHvvWQ5pP1s+cA3PitmH5Cs6sEAwHrYQtoYCqerjGntgI77S89+S/EJpPzZ6wCSBiHUAdS2KL4D5aOpVfsD1wLK8Z+32cgYgJYHIDIBrIR5sQP16kCmBDvDbKwLhKGdwCcxTwgQHHZJ8p23/dFun0xYDdkyK7XwGu1EED9SBLHElmx0+6zc6B3A93re0h4bllU63Jps33MFB9Y293Fbsv35icDyK0/CwUe2W4AcEUy8fvkFwMHyt3uB/BFE9z0GBDEOhg5TgR3Y49BvuEQt+rh2iGFdjBZvCDHJgw4BCkhNTKwYRyMDEddoDHY/vi1c4pcQhKA1kHR1I5CZshsrZIcENY4od0hnHOoWUME5bAROyAUPgvzuz79KhDLOTokPqG5CfBVNDiOp3FCBAF4zRMQvDxwG6caCARJniEwhwY82hlHaHlMLADpQoArRavpQIsR1tQhYuWMhsL449BJhmnMpPMIoGX8lh5+OXvsWpwHRzhyXK4dMJuEVIFhnfI4cj216tdTSswhYrcLf4qD52ag1QVi3XqDdtBuAXQSUINabCoKp3MYedxTJ2DRuDgzft8wh5oi9uDjWwW8IkpvcmhHjYrqyAO5mDPBjg3Eew2cG+DKRX7YYWUNJFGDmh9feIe4OJp5cjq/3VLgQMA7MjERLbZEZxH5EVChBgw7kYZVP7Bc2RMQtIeXF3QfCwAvRYEekVuH8CNW+nKUT0DWFQ5iR1FVUbsP2EX9ehLNE4X7HFyYire2IzAeFxh5qji6Wo+frvz+HLCnhT8F4ZlCNH+VVRcPb4XcItFD0DOt/Q4mAxKY615Gv1dCuCJs60prOGfX/jo1ZCuAZRgXe0QwMU7ssyRjrRKrIOdqJtlmlbRFnGIBrf8v+hPTPtxnTF+jqeKQtAh9yVTiM+AQVKMRA0T6xjJ2FYwnkmM/41iEUdYlkWKLw7sjyRD7WRLVAIAlB6xQQgrk2JLZOCAeLgm/pTja7Fj/mljMEb2ITFVi9xg4tMUgAzH5MHRbzVEQyPPL7FVRWnUEcoN3EaNIREI6EUuz/49Bhuc4qIY0PHFWjXitorgTSJxHeDLx0sCkdKI24iiD2FwiDiuI86TjuMVIsvifx4HATYJUXBCcKOpHISvBVHAUWwMpzhDIJL7Zjt+MVEcjXBCQoibyIbGkTUh5E+Xuhz4Ajc7RgEs8ZYPxG0M/Y4oSwEUNqEjjoJbnDifkM2z0c+JVEuUfONzE/iBhIkIYeJJQm4TJRnzLzk6NvFBjtRNjf4WGMpwBiXRQYncfPShFSB+x/XB6CmPs5VCdBTnficlwVF0TmxnI4WJ+Ne4Si8xM+eCVgSJE2SSRrk6SWlw8lMjnJE3JbiBPvoYTLubrDfmxLbZ4jQpnErkUFJO6xS0J6IoURFPsGsTsxwUi8SlLCmeSTxLTLKUlPpG5SyWGgXST2204aTB2nogEU/BvFyDd88fRQe127HmcU+GgtRuoNMmHi/YH47yflyklkSHJrg0wUhNKGjjGxyhCcatzPYXt/xHg7CbSNQl4S4Js0jCYlLwZCS4hrAfwQNMoa0TFxMk1gIRKwkTSBJ5QtyXqJOmYTxpSIi6WOOGm/iPQjEzaJtOXGrT0JQ4woTUPvDvT2JcU4SdUOKFnT7pyXR6fZOekaBRIBU67kVK2mAzVO5U1SY1IfwKCzRYAqurqMFHg5Iccmf6WfBNFyYMZzAnUccOOkaAbRBMy4SjOdquijehw/wo8KhlU4ac+04Lg1LpnqS3RNLLSVq2vFOjTRrU2eu/264EUupRksyTCK0EOcrJzEgCUtKAk9Bdhu3eKU5PZmuMVZeQsCbJPmnUzWAWsoSTrN2mwyop8MjiIbMRmfc9p8knCQbPxl5CdpGgU6XdNFEXTLZpU4SZRNBluzkuHsz6alPyn6yNA/spSfBRUnbChZ9Mg4fcI9HMztJsiCqe2w1EtS7xbU/Hh1NMkmSeumgzerLPhHWTbZy0oRiFM9lOzqowc8UaXIDkEibBesjWX92rlhy1prgxCTAKzFiDG5OUmuWrI0A2yfZUE2yb5KekUyvupsoAebLpHOQrZ6Q72a7MHk+Sm5V0nGUJTkkDziJ1FOyUdLC4TCnR6o+QWkVTncyGZscpmXkVHkGiHZRcpWVsNtBRzj5MckMZqxXnWizhDcogknIWQkzJBwrPmS/P1Fszr50UmmdsMDHb9SZmk2qWGO9ggB5oUAIJnbilQWS/YHQ4TjoFfGpi/YcgF4PFCcRQAjYkkCwAsEwU9AxIcMSuUBhrj9sC+FTP+fhNkT+hUUGKChUikf7J5cUcjC1uaPdFny7GdTHyFfiNgc52FqAThQG0fk8LLRo86YE4n9AsLeMwGUDC/xTYnyn52M+hdxhgD+lK5oc5eRoqHH6BOgOiq+TPMckaAwADgPgC1HkU34iITKGLq2h6E8LpBCVMRtbynBwKikVUOXKtEyKcc0AxRTxeooiJPxsFYAXBeKCEUWBuIJQCwOJEIXELkFpC8he/KSKUKk41CkfrQqgXXSNAjCrYMwtSVjlWFTCwTDilEX4pMluA9Njkv4WyxBFJSgpWUpKAcLKlXCzGWTLoWMjQ0C0OaBInbmZTO5RBdJQECUWrNT5Ui3JQSAgDaKilTGXRX5P/mChDFxilOKYtcEWLxQVi8efQKGVpKS8diqlA4vwBOKkBY/OpW4ocEeLfQXiu3D4tm7cV/FxOIJeTPzKhKDAUjAhXMCIVvjWAZClmDYsTimx2lECmqfHKmX5KBMgKh/qUpEV4pew4ytRa8ouVfNmcjSgTHCrEUqKJFvM2pfotTq9K5Fcy+5dXBZhjKqliwuOefKmVaL0pWIwZfoM9YLKR5UyggCsuJU0JmVkM0eZsu5BQsdlHcxlcMoOW3x7Fjin4YzJcWgSnWfkBlZQBeUUxvFRrXxTgKeWBKblwS1xUsAvLP8vlIAKSCQr+UpKgFk8tFQoqoUgqf52S8FUsryWP9oVwioTK0oRUUrfhvCqplqoaW8ZHV5S+FbyERWSLQxUymRX0uhWKLqIAa3FTavxV+xaVqy1WcJLZUEJ41jsvYrsrCAKqkEu6SAkgD1XVTbsLyrpSDke5xK1IGKPVQaqSVGqAVHKs1UzAtXiLuFUa6lbatgX2ra1VJRXGwoPl44XVlq73tapbWrivVq0H1WjOHx9rG1HSyBdGu6U9AhAlXa8nuUVnALkcti0VUcvFXBjnFgglFSOr4C34LAYqk5RKtPlSq8prIMoB2A6TrzqJhTEVdvgHxNSFBkarGcipjU9A41Ha+2WsrLmfck1Ri79SHJMV/qWx6a+VRqpgRKq61fANYKWs6AYpsgkGxVaet6GFq8VLc7VZTjCVKKK1Pyw1RoH+UBBn6y686clxGUgYI1rqxmZMoe6yqlp1y+Bdumg2dq+wjy0TgEr8LobZ1xa7DQYFw2sKYlcSiSN8sSXk9CNxqpdRPL2XFLzVZKqjf2poU1KeNLXdxQmEzUGxZNKqqxmqq42Qai1IuEJjIxgARYMFValfujUpB4axN1qaAFvCk3gach8eMescWo0TKg1ykrTW2KhYfUAyrmxTVkuU1DqZBjmjTeoC81sb+mum0ItxuC28b/ergMdFZqrgJLflEmmtefRfpgyJKFG8lQFuqVI8MNX07NjsBI3SahV+y1HP5qnWgrf5RWlGqxveows/NtJV9Z0vq0Xq666kMrY5pGHObjWToNrTOri0Na113m6Fn6UCDfU3NSKgzdqXo2v0wtLGsbZFsFbRaNssWvhfBXYE7BPlKW0TWlvAB2aetgqyIcKqq20kpGQ2sFSNqh4gMIxl2+FtPRm2Brn5q4/YgBoqBqQUAPAfGNtgGUrrTVPQOrg1w1B9h1lCFULchqzVMZTgMgGQOLECAeBxIBAJDUxuxVNr1V6OubUyHhLAxaayW53AdoI0gAiNdKkhGQ19k5aq44atKC9ubVbaQtVy9TdDs039btN7GmgM8v00dbcdO1WyoTu02VrxNR2maKQyy1U7qKRTQbfTrfU46uWMGwKj5ua1fV1I12urSps63JKMtDm07U5pJW07Yg6uwdYzqvFqb5QS2u5cqoeVRaON3O7HbzuUjPYnQe2onfqvw3mbRd9m5spToXlS7NaLup7cZqxWnK5djupGQFSa2TbVdgehFrLva2a7e5pOyTfPI3n+UKNxuoLabtU167Ld2a+HYjrADI6xIqOyDaHr00O7E9TuynDQGPET0nt1mw7WTrDUNqMd06m7dnvm1Q70diqq3WfDh0I6WoSOlHWjvy2UrYFPOqvVeCfhZRmovoJAB4AgAib3dNm7jLEDQXi7SN2WwacSxZWtrUY2waaN2ErkAApOaODtA0elu9ty3dGfvawQ6n46+/IIvuX3C7ZET+k7XKv10AzL9rgg/cwAATyzFpZGiSnfov09yXq1+5jX3p6BgGE10+/Yjmr1VmaRdl8lOMLoW34ZGNN+9nYcQx45rR9zG1DTws20erDNlOKmcTvoCYH3M2B6AxFvv4EHWdYnHmVjre0hKKDgCjA+bozXMHlt927AGzkyhMGe99MYg/bvYPFrWx2AODfNAQ35BCDUG8ySLreLcHc9fBmAzBIgPT6CaZ9NQ1/rz0Izf9WGh+oiQiz6HAdmYQwx9ObnxaCSCiPVlQbIA8GINohtnTYb0WYadexaCw4to0OjCH9lOSfr4d8rWGf92h10Dto/IhGyyYRmKSVIiOYRndB2GI5RTiMlzu5th8g7IjQOpbcozOi3f4dwPYA0cUOEQ14vENsHNV2R7jJQZX2LAXDE+tw+FuKOMHn+ihlDduokPVHLU3orgx7ucMFHeDzR/gwFSEPlGiDXRqo++pCWIGC9Q+ovSPrL3KG9s6wpwzQbSNFGLZIGxI9cBCbo8yj7Rvgysa3rDxUjqtdIz+vgORHdDzkc48HUuPAbf1uxtsPCTCY+GBjGxi41sc5U7GsjvR3sh2MV73G96jxkAFyu3mfNvD7WEEyDDBMQnppwTC8hbzyPUGoDUGzQ08euNJGXeHA1E4MYMM/Gz4CJkokif52XJ0Dnx9E73t3Qkn1y1enI2YE42wmdQ8Jv454akPhjBDfACY0oell5yoa+Jr4wUjoMYmAjxh5VHoapNDHXDOBjw4su20160B5h6UzSNFM0mjDLxkw73yIH1H8japlnSMcxOXSFTHBybPeBiJ6m0TMppo3KfCP/G+de2V3laYJMMbDTdp+I9PIlPkmUjqpt04UaNPFSvTWp/Y1XHGNHGRjJx3RuscaNgmIZkJxUyXzuN+nN06pmHfKb32Jn2Cypj42JuFMfw0z7h+0xyZqMIo++MZm03GammkmI6yJi0yQxdP5n1AhZloxme5VvLcTvpvM7GaJMZHkpIZn09EZTNYH3T9B8HgkYdNO64UU0O3Z7uQOwjozjZ6k+meLOmm7DUA5M92fUOBnNTk5nQ6Yb0ownhzsR3s1ob3M3HVjprP+kKZ7M7m2zCZrww011Msm1wVZw6YidrNBGUTFZwk3edXOZmzTOWZ0y+bzBgmt5H5js/7wpM3ntzHpvsxOZLO9GDcfQmOJ1FARzmH1lgY9bAB0AdhcQSgTQMPGoyN8+wCvXhOWf1Xfm5Ezpx5vsVQVdC+ieFo0ARZGBFhhkm0HAD2G5BdgQAhnfrExdCAEXygxgYYAiV4tPxuI2wTaGjHxRzQ/V2AWwEgC7CcaBL0yEAAiG9LwBYAqmKAPWEoAIg0c2l7FHpfUtIBugdmzWAiB0C9AtgPAMwDwAABeRmZC0uy8AyBULWG/aJ0E6CDAyUHGrca6ieUCGdAnQTgNsDQA8wq4vCHDdRFYAxWZw85l4EouRRCb4lGgeK7ECiWpXl9YSiJRcBhE4L/AkS/bQVfCVFXRU2VuKwYDytZXYl8S7TC8CkZVXGrDekq2nQ9CVFcguatq5USasWaTgru7TbXq/bmLUAderq3qptKNsiqgu2bsNfr1T1BeY1ga61bd02k+r0UdSINdm5qREt+V3a1sFFizW+wEAZ/qwFOvx89VYmOQ8wudnwby1KW3yPKvvBbAArduXCIYEGNiRSQI14gPVmyjTATgL+nQE/uBvLBtVQAA=='
const decompressedDMMF = decompressFromBase64(compressedDMMF)
// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(decompressedDMMF)
exports.Prisma.dmmf = JSON.parse(decompressedDMMF)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Code\\Craftex\\api\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [
      "deno"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "..\\..\\.env",
    "schemaEnvPath": "..\\..\\.env"
  },
  "relativePath": "..\\..\\prisma",
  "clientVersion": "4.13.0",
  "engineVersion": "1e7af066ee9cb95cf3a403c78d9aab3e6b04f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "dataProxy": true,
  "postinstall": false
}
config.dirname = dirname
config.document = dmmf

config.inlineSchema = 'Ly8gVGhpcyBpcyB5b3VyIFByaXNtYSBzY2hlbWEgZmlsZSwKLy8gbGVhcm4gbW9yZSBhYm91dCBpdCBpbiB0aGUgZG9jczogaHR0cHM6Ly9wcmlzLmx5L2QvcHJpc21hLXNjaGVtYQoKZ2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgICAgICAgID0gInByaXNtYS1jbGllbnQtanMiCiAgcHJldmlld0ZlYXR1cmVzID0gWyJkZW5vIl0KICBvdXRwdXQgICAgICAgICAgPSAiLi4vZ2VuZXJhdGVkL2NsaWVudCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiREFUQUJBU0VfVVJMIikKfQoKbW9kZWwgUGx1Z2luIHsKICBpZCAgICAgICAgICAgICBTdHJpbmcgICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIG5hbWUgICAgICAgICAgIFN0cmluZyAgIEB1bmlxdWUKICBkZXNjcmlwdGlvbiAgICBTdHJpbmcKICBjb250cnVidXRvcklkcyBTdHJpbmdbXQogIHZlcnNpb24gICAgICAgIFN0cmluZwoKICBhdXRob3JJZCBTdHJpbmcKCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAdXBkYXRlZEF0CgogIEBAaW5kZXgoW2lkLCBuYW1lXSkKfQo='
config.inlineSchemaHash = 'f1e39c3c41355f5e93ae6df07b242b466eb506d73588eec47040c4ab47de640d'

config.inlineDatasources = {
  "db": {
    "url": {
      "fromEnvVar": "DATABASE_URL",
      "value": null
    }
  }
}

config.injectableEdgeEnv = {
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
}

config.edgeClientProtocol = "graphql";
if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

