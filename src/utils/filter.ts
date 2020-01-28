const allKeysFilter = <T extends { [index: string]: any; }>(
  xss: T[],
  filter: { [k in keyof T]: (x: T[k]) => boolean }
) => {
  console.log("XSS", xss);
  console.log("filter", filter);

  return xss.filter(xs => {
    console.log("entries1")


    return Object.entries(filter).filter(([kk, vv]) =>
      ((kk !== "pets") && (kk !== "breakfast"))
      ||
      (kk === "pets" && vv)
      ||
      (kk === "breakfast" && vv)
    ).every(([k, v]) =>
      k in xs && Array.isArray(v)
        ? (!("0" in v) || v[0] <= xs[k]) && (!("1" in v) || xs[k] <= v[1])
        : v === xs[k]
    )
  }

  )
};

export default allKeysFilter;
