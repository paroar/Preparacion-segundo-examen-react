const allKeysFilter = <
  T extends {
    [index: string]: any;
  }
>(
  xss: T[],
  filter: { [k in keyof T]: (x: T[k]) => boolean }
) =>
  xss.filter(xs =>
    Object.entries(filter).every(([k, v]) =>
      k in xs && Array.isArray(v)
        ? (!("0" in v) || v[0] <= xs[k]) && (!("1" in v) || xs[k] <= v[1])
        : v === xs[k] || xs.name.includes(v)
    )
  );

export default allKeysFilter;
