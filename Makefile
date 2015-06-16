NODE_BIN := $(shell npm bin)
OUT := out
ABS_C_BUILD := $(OUT)/component-build
SRC := lib
TEST := test

all: build test

test: build
	$(NODE_BIN)/karma start --browsers Chrome --single-run

build: $(ABS_C_BUILD)/build.js $(ABS_C_BUILD)/build.css

clean:
	rm -rf $(OUT)

$(ABS_C_BUILD)/build.js $(ABS_C_BUILD)/build.css: $(OUT)/client.js $(OUT)/views/notification-bar.js $(OUT)/styles/notification-bar.css component.json
	$(NODE_BIN)/component-build --out $(ABS_C_BUILD)

$(OUT)/client.js: $(SRC)/client.coffee
	$(NODE_BIN)/coffee --compile --output $(@D) $<

$(OUT)/views:
	mkdir -p $@

$(OUT)/views/notification-bar.js: $(SRC)/views/notification-bar.jade | $(OUT)/views
	@printf "%s" "module.exports = function(jade) { return " > $@
	$(NODE_BIN)/jade --client < $< >> $@
	@printf "%s" " }" >> $@

$(OUT)/styles:
	mkdir -p $@

$(OUT)/styles/notification-bar.css: $(SRC)/styles/notification-bar.styl | $(OUT)/styles
	$(NODE_BIN)/stylus -o $(OUT)/styles --inline $<

.PHONY: test all clean
