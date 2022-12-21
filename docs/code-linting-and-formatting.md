# Code linting and formatting

## [ESLint](https://github.com/eslint/eslint)

Eslint is used to enforce code conventions in this project. [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript) 
(enforces https://github.com/airbnb/javascript) is used as a base for the eslint-configuration. Additionally, [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) 
is required for parsing typescript files and using rules that require type information. [angular-eslint](https://github.com/angular-eslint/angular-eslint) is used for angular specific tooling and rules and
parsing Angular templates.

### Usage

You can run ESLint through angular cli with `ng lint` or for a specific project with `ng lint <project>`. If you want to fix 
all automatically fixable problems run the command with `--fix`-argument.

**NOTE: It is highly recommended to use a code editor plugin for ESLint.** 

**NOTE2: (At least Idea users) If the plugin complains about paths try setting the working directory to `ngx-fudis`.**

### Configuration

`.eslintrc.json` -files are used for ESLint configuration. Currently, the root configuration file, that contains all the 
base rules, is in `ngx-fudis`-folder. Each Angular-workspace project has its own configuration file that extends the root 
configuration and overrides or adds rules if needed.

If you create a new Angular workspace use `ng g @angular-eslint/schematics:add-eslint-to-project <project>` to add an ESLint
support to the project. This generates a basic configuration file and also makes appropriate changes to `angular.json`.

**NOTE: Once this project is updated to Angular 14 it is possible to add:**

<pre>
"cli": {
"schematicCollections": ["@angular-eslint/schematics"]
}
</pre>

**This will automatically execute the custom schematics provided by @angular/eslint when creating a new app or lib.**


### Updating

Start by running `ng update @angular-eslint/schematics`. This should update all the `@angular-eslint` and `@typescript-eslint` 
-dependencies and the `eslint` dependency. Then update these packages directly with npm:
- `eslint-config-airbnb-typescript`
- `eslint-config-prettier` 
- `eslint-plugin-prettier`

You should probably also update prettier if you update the eslint prettier packages.
## [Prettier](https://github.com/prettier/prettier)

Prettier is used for formatting the code and templates. 

### Usage

Currently Prettier is run as an ESLint rule with `eslint-plugin-prettier`. Use the same command `ng lint` and ESLint plugins
to format the code. It is possible but not recommended to run prettier separately as the Prettier configuration is separate 
from the ESLint configuration.

### Configuration

Current Prettier configuration used in projects is defined in `ngx-fudis/.prettierrc.json`. ESLint configuration extends
`"plugin:prettier/recommended"` to disable all ESLint formatting rules that would conflict with Prettier. 

### Updating

Update `prettier` directly with `npm`. Also update `eslint-config-prettier` and `eslint-plugin-prettier` if needed.


