TESTS = test/*.js
REPORTER = spec
TIMEOUT = 10000
MOCHA_OPTS = 


test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--require should \
		--harmony-generators \
		--reporter $(REPORTER) \
		--timeout  $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html

test-all: test test-cov

.PHONY: test
