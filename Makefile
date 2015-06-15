NODE_BIN := $(shell npm bin)
OUT := out
C_BUILD :=component-build
ABS_C_BUILD := $(OUT)/$(C_BUILD)
SRC := lib
TEST := test

# alias
component-build: $(ABS_C_BUILD)/build.js $(ABS_C_BUILD)/build.css

test: component-build $(OUT)/$(TEST)/browser.js $(OUT)/$(TEST)/test.html
	$(NODE_BIN)/component-build --dev --out $(OUT)/$(TEST)

$(ABS_C_BUILD)/build.js $(ABS_C_BUILD)/build.css: all
	$(NODE_BIN)/component-build --out $(ABS_C_BUILD)

all: $(OUT)/client.js $(OUT)/views/notification-bar.js $(OUT)/styles/notification-bar.css component.json

$(OUT)/client.js: $(SRC)/client.coffee
	$(NODE_BIN)/coffee --compile --output $(@D) $<

$(OUT)/$(TEST):
	mkdir -p $@

$(OUT)/$(TEST)/browser.js: $(SRC)/$(TEST)/browser.coffee $(OUT)/$(TEST)
	$(NODE_BIN)/coffee --compile --output $(@D) $<

$(OUT)/$(TEST)/test.html: $(SRC)/$(TEST)/test.jade $(OUT)/$(TEST)
	$(NODE_BIN)/jade --out $(@D)  $<

$(OUT)/views:
	mkdir -p $@

$(OUT)/views/notification-bar.js: $(SRC)/views/notification-bar.jade $(OUT)/views
	printf "%s" "module.exports = function(jade) { return " > $@
	$(NODE_BIN)/jade --client < $< >> $@
	printf "%s" " }" >> $@

$(OUT)/styles:
	mkdir -p $@

$(OUT)/styles/notification-bar.css: $(SRC)/styles/notification-bar.styl $(OUT)/styles
	$(NODE_BIN)/stylus -o $(OUT)/styles --inline $<

clean:
	rm -rf $(OUT)

mostlyclean:
	cd $(OUT) && ls | grep -v 'components' | xargs rm -rf
