all:
	pnpm run ncc && \
	 mv dist/index.js ./agency && \
	  chmod +x ./agency && \
	   node scripts/add-shebang.js ./agency


install:
	mv ./agency /usr/local/bin/agency