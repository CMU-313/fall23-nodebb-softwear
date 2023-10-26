#!/bin/sh
# This is borrowed from, https://superuser.com/questions/303559/replace-symbolic-links-with-files
set -e
for link; do
    test -h "$link" || continue

    dir=$(dirname "$link")
    reltarget=$(readlink "$link")
    case $reltarget in
        /*) abstarget=$reltarget;;
        *)  abstarget=$dir/$reltarget;;
    esac

    rm -fv "$link"
    cp -afv "$abstarget" "$link" || {
        rm -rfv "$link"
        ln -sfv "$reltarget" "$link"
    }
done
