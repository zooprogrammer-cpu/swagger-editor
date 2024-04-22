const selectMustache = () => `**Links to help you with this tool:**

- [Mustache cheatsheet](https://smartbear.atlassian.net/wiki/spaces/SHUB/pages/3993371192/Markdown+Cheatsheet+for+Codegen+Editor)
- [Codegen Editor Feature](https://smartbear.atlassian.net/wiki/spaces/SHUB/pages/4047208505/Codegen+Template+Editor+Features)

---

# {{info.title}}

> {{info.description}}

## Paths

{{#each paths}}
- {{@key}}
{{/each}}`;

export default selectMustache;
