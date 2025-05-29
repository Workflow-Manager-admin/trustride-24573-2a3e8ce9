              color: "#c00", margin: "8px 0 0 0", fontWeight: 500,
              fontSize: 15, textAlign: "center"
            }}>
              {error}
            </div>
          )}
          {successMsg && (
            <div style={{
              color: "var(--accent)", margin: "9px 0 0 0", fontWeight: 600,
              fontSize: 15.3, textAlign: "center"
            }}>
              {successMsg}
            </div>
          )}
        </form>
        <div style={{ marginTop: 24, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>
          Only emails ending with <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{INSTITUTION_DOMAIN}</span> are accepted.
        </div>
      </section>
    </div>
  );
};

export default SignInScreen;
